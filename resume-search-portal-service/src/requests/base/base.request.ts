import { getEnvValue } from "../../utils/env.utils";

class BaseRequest {
  public getAPIKEY() {
    return {
      api_key: getEnvValue("GEMINI_API_KEY"),
    };
  }
}

export default BaseRequest;
