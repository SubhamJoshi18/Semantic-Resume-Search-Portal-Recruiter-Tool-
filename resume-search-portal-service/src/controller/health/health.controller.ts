import { Request, Response, NextFunction } from "express";
import HealthControllerAbstract from "./abstract.health";
import {
  getHealthServiceInstance,
  HealthService,
} from "../../services/health.service";
import { sendGenericRespone } from "../../libs/common.response.libs";

const healthInstance = getHealthServiceInstance();
class HealthController implements HealthControllerAbstract {
  public async getHealthStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const apiResponse = await healthInstance.getHealth();
      const { data, message } = apiResponse;
      sendGenericRespone(res, data, message);
    } catch (err: any) {
      next(err);
    }
  }
}

const getHealthInstance = (): HealthController => {
  return new HealthController();
};

export default getHealthInstance;
