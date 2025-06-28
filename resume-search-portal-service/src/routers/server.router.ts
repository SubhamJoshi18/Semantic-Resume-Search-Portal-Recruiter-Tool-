import { Application } from "express";
import healthRouter from "./health.router";
import fileRouter from "./file.router";

async function serverRouter(app: Application) {
  app.use("/api/v1", [healthRouter, fileRouter]);
}

export default serverRouter;
