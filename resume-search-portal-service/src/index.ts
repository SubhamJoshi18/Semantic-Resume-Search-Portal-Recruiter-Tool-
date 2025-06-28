import { resumeLogger } from "./libs/common.logger.libs";
import startServer from "./server";
import clearS3Bucket from "./helpers/file.helper";
import startAllConsumers from "./queues/consumers/main.consumer";

(async () => {
  resumeLogger.info(`Starting the Backend Service`);
  clearS3Bucket().then(async () => {
    await startAllConsumers();
    await startServer();
  });
})();
