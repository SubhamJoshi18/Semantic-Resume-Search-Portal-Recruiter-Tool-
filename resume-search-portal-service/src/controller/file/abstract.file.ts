import { NextFunction, Request, Response } from "express";
import { IAPIResposne } from "../../interface/api.interface";

abstract class AbstractFileController {
  abstract uploadResume(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<IAPIResposne>;
}

export default AbstractFileController;
