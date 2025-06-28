import json
from pika.exchange_type import ExchangeType
from Constant.QueueConstant import extraction_queue_config
from Handle.ResumeExtractionHandler import resume_extraction_handler


def consume_resume_extraction(channel):
    try:
        name, exchange = extraction_queue_config.values()

        channel.exchange_declare(exchange=exchange,exchange_type=ExchangeType.direct.value,durable=True)
        channel.queue_declare(queue=name,durable=True)


        def callback(ch,method,properties,body):
            try:
                parse_content = json.loads(body)
                print(f'Message Received on {name} : {parse_content}')
                resume_extraction_handler(parse_content)
                ch.basic_ack(delivery_tag=method.delivery_tag)
            except Exception as callback_error:
                print(f'Error Handling the Consume Message in the Callback, Error {callback_error}')
                ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

        channel.basic_consume(queue=name,on_message_callback=callback)
        print(" [*] Waiting for messages in the Resume Analyzer Service. To exit press CTRL+C")
        channel.start_consuming()
    except Exception as error:
        print(f'Error While Consuming the Resume Extraction Error, {error}')
