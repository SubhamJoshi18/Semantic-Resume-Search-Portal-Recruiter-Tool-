import express, { Application } from "express";
import serverMiddleware from "./middlewares/server.middleware";
import serverRouter from "./routers/server.router";

async function expressSetup(): Promise<Application> {
  return new Promise(async (resolve, reject) => {
    const app = express();
    await serverMiddleware(app);
    await serverRouter(app);
    resolve(app);
  });
}

export default expressSetup;
