import { resumeLogger } from "./libs/common.logger.libs";
import startServer from "./server";

(async () => {
  resumeLogger.info(`Starting the Backend Service`);
  await startServer();
})();
