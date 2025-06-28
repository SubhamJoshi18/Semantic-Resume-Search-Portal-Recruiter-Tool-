import { Request, Response, NextFunction } from "express";

abstract class HealthControllerAbstract {
  abstract getHealthStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}

export default HealthControllerAbstract;
