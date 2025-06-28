import amqp from "amqplib";
import consumerConfig from "../../config/consumer.config";
import getAMQPInstances from "../queue.manager";
import { resumeLogger } from "../../libs/common.logger.libs";

async function startAllConsumers() {
  const amqpInstances = getAMQPInstances();
  const channelBroker =
    (await amqpInstances.getChannel()) as unknown as amqp.Channel;
  for (const [consumerKey, consumerFunc] of Object.entries(consumerConfig)) {
    if (typeof consumerFunc === "function") {
      resumeLogger.info(`Consumer is going to Up For ${consumerKey}`);
      await consumerFunc(channelBroker);
    }
  }
}

export default startAllConsumers;
