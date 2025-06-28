import amqp from "amqplib";
import { resumeLogger } from "../../libs/common.logger.libs";
import {
  directExchange,
  resumeExtractionConfig,
} from "../../constant/queue.constant";

async function publishToResumeExtraction(
  channel: amqp.Channel,
  message: object
) {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, exchange } = resumeExtractionConfig;

      await channel.assertExchange(exchange, directExchange, { durable: true });

      await channel.assertQueue(name, { durable: true });

      resumeLogger.info(`Publishing to the ${name}...`);

      const bufferPayload = Buffer.from(JSON.stringify(message));

      channel.sendToQueue(name, bufferPayload);

      resumeLogger.info(
        `The Message ${JSON.stringify(message)} Was Publish to the ${name}`
      );
      resolve(true);
    } catch (err: any) {
      resumeLogger.error(`Error Publishing to the Resume Extraction Queue`);
    }
  });
}

export default publishToResumeExtraction;
