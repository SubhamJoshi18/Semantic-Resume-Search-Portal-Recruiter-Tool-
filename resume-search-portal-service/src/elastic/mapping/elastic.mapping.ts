import { Client } from "@elastic/elasticsearch";
import { searchProperty } from "../../config/elastic.config";
import { elasticIndexes } from "../../constant/elastic.constant";

function putMappingOnElastic(client: Client) {
  return {
    properties: {
      summary: searchProperty,
      experience: searchProperty,
      projects: searchProperty,
      skills: searchProperty,
      education: searchProperty,
      certifications: searchProperty,
      languages: searchProperty,
      others: searchProperty,
    } as any,
  };
}

export default putMappingOnElastic;
