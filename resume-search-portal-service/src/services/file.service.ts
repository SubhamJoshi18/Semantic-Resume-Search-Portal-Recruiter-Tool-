import { IAPIResposne } from "../interface/api.interface";
import { IFileContent } from "../interface/file.interface";
import { HttpExceptions } from "../exceptions";
import processFileValidation from "../validation/file.validation";
import { HTTP_STATUS } from "../constant/http.constant";
import { resumeLogger } from "../libs/common.logger.libs";
import { getObjectValue } from "../utils/env.utils";
import getAMQPInstances from "../queues/queue.manager";
import amqp from "amqplib";
import publishToResumeExtraction from "../queues/publisher/resume.extraction.publisher";

const amqpManager = getAMQPInstances();
class FileService {
  public async uploadFileProcess(
    fileContent: Required<IFileContent>
  ): Promise<Required<IAPIResposne>> {
    return processFileValidation(fileContent)
      .then(async (status: boolean) => {
        resumeLogger.info(
          `The Validation Status For ${getObjectValue(
            fileContent,
            "originalname"
          )} is ${status}`
        );

        const queuePayload = Object.preventExtensions({
          pdfPath: fileContent.path,
        });

        const brokerChannel =
          (await amqpManager.getChannel()) as unknown as amqp.Channel;

        resumeLogger.info(`The Broker Channel Has been Opened`);

        await publishToResumeExtraction(brokerChannel, queuePayload);

        await amqpManager.closeChannel();

        resumeLogger.info(`The Broker Channel Has been Closed`);

        return {
          data: fileContent,
          message: `The Resume Has been Uploaded Successfully`,
        };
      })
      .catch((err) => {
        throw new HttpExceptions(
          HTTP_STATUS.VALIDATION_ERROR.CODE,
          err.message
        );
      });
  }
}

const getFileInstance = (): FileService => {
  return new FileService();
};

export default getFileInstance;
