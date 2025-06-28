import { Request, Response, NextFunction } from "express";
import HealthControllerAbstract from "./abstract.health";
import {
  getHealthServiceInstance,
  HealthService,
} from "../../services/health.service";
import { sendGenericRespone } from "../../libs/common.response.libs";

class HealthController implements HealthControllerAbstract {
  private healthInstance: HealthService;

  constructor() {
    this.healthInstance = getHealthServiceInstance();
  }

  public async getHealthStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const apiResponse = await this.healthInstance.getHealth();
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
