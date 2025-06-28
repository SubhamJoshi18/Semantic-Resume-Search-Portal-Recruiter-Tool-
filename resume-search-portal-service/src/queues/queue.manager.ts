import amqp from "amqplib";
import { getEnvValue } from "../utils/env.utils";
import { resumeLogger } from "../libs/common.logger.libs";

class AMQPManager {
  private amqpUrl: string = getEnvValue("AMQP_URL") as string;
  private amqpPort: number = Number(getEnvValue("AMQP_PORT")) as number;
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;

  private async initalizeConnection() {
    try {
      if (!this.connection) {
        this.connection = await amqp.connect(this.amqpUrl);
        this.channel = await this.connection.createChannel();
        resumeLogger.info(`The RabbitMQ Connection Has Establish Successfullyo on port : ${this.amqpPort}`);
      }
    } catch (err: any) {
      resumeLogger.error(
        `Error Connecting to the RabbitMQ, Please The Service RabbitMQ is Running or not`
      );
      throw err;
    }
  }

  public async getChannel() {
    return new Promise(async (resolve, reject) => {
      if (!this.channel) {
        await this.initalizeConnection();
      }
      resolve(this.channel);
    });
  }

  public async closeChannel() {
    return new Promise(async (resolve, reject) => {
      if (this.channel) {
        await this.channel.close();
        this.channel = null;
      }
      resolve(true);
    });
  }
}

const getAMQPInstances = (): AMQPManager => {
  return new AMQPManager();
};

export default getAMQPInstances;
