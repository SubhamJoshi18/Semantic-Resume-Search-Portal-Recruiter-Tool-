import consumeElasticPayload from "../queues/consumers/elastic.consumer";

const consumerConfig = {
  elasticConsumer: consumeElasticPayload,
};

export default consumerConfig;
