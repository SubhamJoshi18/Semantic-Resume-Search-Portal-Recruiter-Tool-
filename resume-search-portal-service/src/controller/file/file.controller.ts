import { Request, Response, NextFunction } from "express";
import { IAPIResposne } from "../../interface/api.interface";
import AbstractFileController from "./abstract.file";
import { sendGenericRespone } from "../../libs/common.response.libs";
import { resumeLogger } from "../../libs/common.logger.libs";
import { IFileContent } from "../../interface/file.interface";
import getFileInstance from "../../services/file.service";

const fileServiceInstance = getFileInstance();

class FileController implements AbstractFileController {
  public async uploadResume(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<IAPIResposne | any> {
    try {
      const fileContent = req.file as Required<IFileContent>;
      const apiResponse = await fileServiceInstance.uploadFileProcess(
        fileContent
      );
      const { data, message } = apiResponse;
      sendGenericRespone(res, data, message);
    } catch (err: any) {
      resumeLogger.error(
        `FileControllerError, Error while uploading the Resume, Please Try Again`
      );
      next(err);
    }
  }
}

const getFileControllerInstance = (): FileController => {
  return new FileController();
};

export default getFileControllerInstance;
