import { Client } from "@elastic/elasticsearch";
import { resumeLogger } from "../../libs/common.logger.libs";
import { IElasticConsumer } from "../../interface/elasitc.interface";
import { elasticIndexes } from "../../constant/elastic.constant";
import { WriteResponseBase } from "@elastic/elasticsearch/lib/api/types";
import APIHelper from "../../requests/request.helper";

async function elasticHandler(payload: object, elasticClient: Client) {
  const apiHelper = new APIHelper();
  let validHandle = true;

  if (typeof payload === "string") {
    payload = JSON.parse(payload);
  }

  try {
    resumeLogger.info(
      `Message Received in the Elastic Handlere : ${JSON.stringify(payload)}`
    );

    const {
      summary,
      experience,
      projects,
      skills,
      certifications,
      others,
      languages,
      education,
    } =
      "sections" in payload
        ? (payload["sections"] as Required<IElasticConsumer>)
        : {};

    const elasticPayload = Object.preventExtensions({
      summary,
      experience,
      projects,
      skills,
      certifications,
      others,
      languages,
      education,
    });

    const saveDocument: WriteResponseBase = await elasticClient.index({
      index: elasticIndexes["cv_extraction_index"],
      document: {
        ...elasticPayload,
        created_at: new Date().toISOString(),
      },
    });

    resumeLogger.info(`The Payload Has been Saved on the Elastic Search`);

    const response = await apiHelper.getRequest(
      elasticPayload as Required<IElasticConsumer>
    );

    const { data } = response;

    const regex =
      /\*\*(Professor.*?)\*\* \((.*?)\)[\s\S]*?\*\*Research Area:\*\*\s*(.*?)\s*- \*\*Why Recommended:\*\*\s*(.*?)(?=\d+\. \*\*Professor|\*\*Important Note)/g;

    const matches = [...data.matchAll(regex)];

    const recommendations = matches.map((match) => ({
      name: match[1].trim(),
      university: match[2].trim(),
      researchArea: match[3].trim(),
      reason: match[4].trim(),
    }));

    console.log(recommendations);
  } catch (err: any) {
    resumeLogger.error(`Error Handling the Elastic Consumer, Error : ${err}`);
    validHandle = false;
  } finally {
    return validHandle;
  }
}

export default elasticHandler;
