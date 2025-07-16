import { dark } from "@mui/material/styles/createPalette";
import { resumeLogger } from "../../libs/common.logger.libs";
import GeminiHelper from "../../helpers/gemini.helper";
import { IElasticConsumer } from "../../interface/elasitc.interface";

class GETMethod {
  public model: GeminiHelper;

  constructor() {
    this.model = new GeminiHelper();
  }

  public async getModelResponse(payload: IElasticConsumer): Promise<
    Required<{
      data: any;
    }>
  > {
    let retryCount = 3;
    let apiPayload = {
      data: null,
    } as any;

    while (retryCount > 0) {
      try {
        const modelResponse = await this.model.generateModelResponse(payload);
        if ("data" in apiPayload) {
          apiPayload["data"] = modelResponse;
        }
        break
      } catch (err: any) {
        resumeLogger.error(
          `Error Fetching the Data From the Gemini API At Retry : ${retryCount}`
        );
        const isMaximumExceeded = retryCount.toString().startsWith("0");
        if (isMaximumExceeded) {
          resumeLogger.error(
            `Maximum API Call Has been Exceeded : ${retryCount}`
          );
          return apiPayload;
        }
        retryCount = retryCount - 1;
        continue;
      }
    }
    return apiPayload;
  }
}

export default GETMethod;
