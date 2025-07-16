import { Client } from "@elastic/elasticsearch";
import { getEnvValue } from "../utils/env.utils";

export const elasticConfig = Object.seal({
  node: getEnvValue("ELASTIC_URL") as string,
  transport: {
    requestParams: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  },
});

export const searchProperty = {
  type: "text",
  analyzer: "autocomplete",
  search_analyzer: "standard",
};
