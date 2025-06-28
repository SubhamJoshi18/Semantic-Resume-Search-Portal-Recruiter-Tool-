import { IAPIResposne } from "../interface/api.interface";
import { IFileContent } from "../interface/file.interface";
import { HttpExceptions } from "../exceptions";
import processFileValidation from "../validation/file.validation";
import { HTTP_STATUS } from "../constant/http.constant";
import { resumeLogger } from "../libs/common.logger.libs";
import { getObjectValue } from "../utils/env.utils";

class FileService {
  public async uploadFileProcess(
    fileContent: Required<IFileContent>
  ): Promise<Required<IAPIResposne>> {
    processFileValidation(fileContent)
      .then((status: boolean) => {
        resumeLogger.info(
          `The Validation Status For ${getObjectValue(
            fileContent,
            "originalname"
          )} is ${status}`
        );
      })
      .catch((err) => {
        throw new HttpExceptions(
          HTTP_STATUS.VALIDATION_ERROR.CODE,
          err.message
        );
      });

    return {
      data: "",
      message: "",
    };
  }
}

const getFileInstance = (): FileService => {
  return new FileService();
};

export default getFileInstance;
