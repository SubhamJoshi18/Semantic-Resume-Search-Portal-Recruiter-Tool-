import { Router } from "express";
import getHealthInstance from "../controller/health/health.controller";

const healthInstance = getHealthInstance();
const healthRouter = Router();

healthRouter.get("/health", healthInstance.getHealthStatus);

export default healthRouter;
