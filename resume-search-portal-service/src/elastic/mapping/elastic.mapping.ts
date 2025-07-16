import { Client } from "@elastic/elasticsearch";
import { searchProperty } from "../../config/elastic.config";
import { elasticIndexes } from "../../constant/elastic.constant";

function putMappingOnElastic(client: Client) {
  return {
    properties: {
      summary: { type: "text" },
      experience: { type: "text" },
      projects: { type: "text" },
      skills: { type: "text" },
      education: { type: "text" },
      certifications: { type: "text" },
      languages: { type: "text" },
      others: { type: "text" },
    } as any,
  };
}

export default putMappingOnElastic;
