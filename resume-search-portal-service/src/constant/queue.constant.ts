const resumeExtractionConfig = {
  name: "resume:extraction-consumer",
  exchange: "resume-exchange",
};

const resumeElasticConfig = {
  name: "resume:elastic-consumer",
  exchange: "resume-exchange",
};

const directExchange = "direct";

export { resumeExtractionConfig, directExchange, resumeElasticConfig };
