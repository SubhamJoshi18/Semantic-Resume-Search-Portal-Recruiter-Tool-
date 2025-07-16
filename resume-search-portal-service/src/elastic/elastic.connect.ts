import { Client } from "@elastic/elasticsearch";
import { resumeLogger } from "../libs/common.logger.libs";
import { elasticConfig } from "../config/elastic.config";

async function connectElastic() {
  let retryCount = 5;
  let retrystatus = true;

  while (retryCount > 0 && retrystatus) {
    try {
      const elasticClient = new Client(elasticConfig);

      const info = await elasticClient.info();

      const { cluster_name, cluster_uuid } = info;

      resumeLogger.info(
        `Cluster Running on the Name: ${cluster_name} with the UUID: ${cluster_uuid}`
      );

      return elasticClient;
    } catch (err: any) {
      const isMaximumExceeded = retryCount.toString().startsWith("0");
      if (isMaximumExceeded) {
        resumeLogger.error(`
            Maximum Retry Has been Exceeded
        `);
        break;
      }

      resumeLogger.info(`Retrying the Elastic Connnection`);
      retryCount = retryCount - 1;
      continue;
    }
  }
}

export default connectElastic;
