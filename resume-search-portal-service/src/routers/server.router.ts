import { Application } from "express";
import healthRouter from "./health.router";
import fileRouter from "./file.router";
import { errorHandler } from "../middlewares/error.middleware";

async function serverRouter(app: Application) {
  app.use("/api/v1", [healthRouter, fileRouter]);
  app.use(errorHandler as any);
}

export default serverRouter;
