import { Client } from "@elastic/elasticsearch";
import { resumeLogger } from "../../libs/common.logger.libs";

async function elasticHandler(payload: object, elasticClient: Client) {
  let validHandle = true;
  try {
    resumeLogger.info(
      `Message Received in the Elastic Handlere : ${JSON.stringify(payload)}`
    );
  } catch (err: any) {
    resumeLogger.error(`Error Handling the Elastic Consumer, Error : ${err}`);
    validHandle = false;
  } finally {
    return validHandle;
  }
}

export default elasticHandler;
