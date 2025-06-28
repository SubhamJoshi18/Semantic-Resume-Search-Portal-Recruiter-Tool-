import { resumeLogger } from "./libs/common.logger.libs";
import startServer from "./server";
import clearS3Bucket from "./helpers/file.helper";
import startAllConsumers from "./queues/consumers/main.consumer";
import { checkFlagPromise } from "./libs/common.server.libs";

(async () => {
  resumeLogger.info(`Starting the Backend Service`);

  checkFlagPromise().then(async (flag: boolean) => {
    if (flag) {
      await clearS3Bucket();
    }
    await startAllConsumers();
    await startServer();
  });
})();
