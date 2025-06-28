import amqp from "amqplib";
import {
  directExchange,
  resumeElasticConfig,
} from "../../constant/queue.constant";
import { resumeLogger } from "../../libs/common.logger.libs";
import elasticHandler from "../handlers/elastic.handler";

async function consumeElasticPayload(channel: amqp.Channel) {
  try {
    const { name, exchange } = resumeElasticConfig;
    await channel.assertExchange(exchange, directExchange, { durable: true });
    await channel.assertQueue(name, { durable: true });

    resumeLogger.info(`Waiting For the Message in the ${name}`);
    channel.consume(name, async (message: amqp.ConsumeMessage | null) => {
      try {
        if (message) {
          const messageContent = message.content.toString();
          const parseContent = JSON.parse(messageContent);
          resumeLogger.info(
            `The Message Has Received in the ${name} Payload : ${JSON.stringify(
              parseContent
            )}`
          );
          await elasticHandler(parseContent);
        }
      } catch (err: any) {
        resumeLogger.error(`Error Consuming the Elastic Payload, Error ${err}`);
      } finally {
        if (channel && message) {
          channel.ack(message);
        }
      }
    });
  } catch (err: any) {
    resumeLogger.error(
      `Error Consuming the Elastic Payload, Error ${JSON.stringify(err)}`
    );
  }
}

export default consumeElasticPayload;
