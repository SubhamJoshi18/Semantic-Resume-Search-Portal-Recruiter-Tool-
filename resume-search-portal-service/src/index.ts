import { resumeLogger } from "./libs/common.logger.libs";
import startServer from "./server";
import clearS3Bucket from "./helpers/file.helper";

(async () => {
  resumeLogger.info(`Starting the Backend Service`);
  clearS3Bucket().then(async () => {
    await startServer();
  });
})();
