import { GoogleGenerativeAI } from "@google/generative-ai";
import { getEnvValue } from "../utils/env.utils";
import { resumeLogger } from "../libs/common.logger.libs";
import { generatePromptForUser } from "../constant/prompt.constant";
import { IElasticConsumer } from "../interface/elasitc.interface";
import { modelResponseMapper } from "../mapper/model.mapper";

class GeminiHelper {
  public apiKey: string;
  public geminiModel: GoogleGenerativeAI;

  constructor() {
    this.apiKey = getEnvValue("GEMINI_API_KEY") as string;
    this.geminiModel = this.initalizeModel();
  }

  public initalizeModel() {
    return new GoogleGenerativeAI(this.apiKey);
  }

  public async generateModelResponse(payload: IElasticConsumer) {
    try {
      const model = this.geminiModel.getGenerativeModel({
        model: getEnvValue("MODEL_NAME") as string,
      });
      const generatedPrompt = generatePromptForUser(payload);
      const modelResponse = await model.generateContent(generatedPrompt);
      const normalizedResponse = modelResponse.response.text();
      resumeLogger.info(`Model Response ${normalizedResponse}`);
      return modelResponseMapper(normalizedResponse);
    } catch (err) {
      resumeLogger.error(`Error Generating the Resposne From the Model`);
      throw err;
    }
  }
}

export default GeminiHelper;
