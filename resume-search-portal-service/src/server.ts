import { resumeLogger } from "./libs/common.logger.libs";
import expressSetup from "./express.setup";
import { terminateServer } from "./libs/common.server.libs";
import { Application } from "express";
import { getEnvValue } from "./utils/env.utils";

async function startServer() {
  try {
    expressSetup()
      .then((app: Application) => {
        app.listen(getEnvValue("PORT"), () => {
          resumeLogger.info(
            `Server is Running on the http://localhost:${getEnvValue(
              "PORT"
            )}/api/v1`
          );
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (err: any) {
    resumeLogger.error(
      `ServerError, Error Starting the Server, Error: ${JSON.stringify(err)}`
    );
    terminateServer();
  }
}

export default startServer;
