import { Client } from "@elastic/elasticsearch";
import { elasticIndexes } from "../../constant/elastic.constant";

function putSettingOnIndex(client: Client) {
  return {
    body: {
      settings: {
        max_ngram_diff: 19,
        analysis: {
          filter: {
            autocomplete_filter: {
              type: "ngram",
              min_gram: "1",
              max_gram: "20",
            },
          },
          analyzer: {
            autocomplete: {
              filter: ["lowercase", "autocomplete_filter"],
              type: "custom",
              tokenizer: "standard",
            },
          },
        },
        number_of_replicas: "1",
      },
    } as any,
  };
}

export default putSettingOnIndex;
