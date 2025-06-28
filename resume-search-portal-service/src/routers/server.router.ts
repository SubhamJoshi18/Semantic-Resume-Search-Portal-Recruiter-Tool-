import { Application } from "express";
import healthRouter from "./health.router";
import { RouteNotFound } from "../libs/common.response.libs";

async function serverRouter(app: Application) {
  app.use("/api/v1", [healthRouter]);
}

export default serverRouter;
