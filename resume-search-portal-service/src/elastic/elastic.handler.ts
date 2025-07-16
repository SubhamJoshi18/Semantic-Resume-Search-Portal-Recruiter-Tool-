import { Client } from "@elastic/elasticsearch";
import connectElastic from "./elastic.connect";
import { resumeLogger } from "../libs/common.logger.libs";
import { elasticConfig, searchProperty } from "../config/elastic.config";
import { elasticIndexes } from "../constant/elastic.constant";
import putSettingOnIndex from "./setting/elastic.setting";
import putMappingOnElastic from "./mapping/elastic.mapping";

async function createIndexes(client: Client) {
  try {
    const isIndexExists = await client.indices.exists({
      index: elasticIndexes["cv_extraction_index"] as string,
    });

    if (isIndexExists) {
      resumeLogger.info(
        `The Index ${elasticIndexes["cv_extraction_index"]} Has Already Exists, Skipping the Elastic Create Operation`
      );
      return;
    }

    await client.indices.create({
      index: elasticIndexes["cv_extraction_index"] as string,
      body: {
        mappings: putMappingOnElastic(client),
      },
    });

    resumeLogger.info(
      `Elastic Index : ${
        elasticIndexes["cv_extraction_index"] as string
      } Has been Created Successfully`
    );
    return;
  } catch (err: any) {
    resumeLogger.error(
      `Error Creating the Indexes, Please Check the Connection`
    );
  }
}

async function getElasticClient() {
  const client: Client = (await connectElastic()) as Client;
  await createIndexes(client);
  return client;
}

export default getElasticClient;
