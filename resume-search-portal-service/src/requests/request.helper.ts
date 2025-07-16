import { IElasticConsumer } from "../interface/elasitc.interface";
import GETMethod from "./methods/get.method";

class APIHelper {
  public get: GETMethod;

  constructor() {
    this.get = new GETMethod();
  }

  public async getRequest(payload: IElasticConsumer) {
    const response = await this.get.getModelResponse(payload);
    return response;
  }
}

export default APIHelper;
