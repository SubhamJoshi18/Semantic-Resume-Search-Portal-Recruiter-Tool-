import json
import pika
from Constant.QueueConstant import elastic_queue_config
from Queues.QueueManager import get_queue_manager_instances

def publish_to_elastic_consumers(payload):
    manager_instance = get_queue_manager_instances()
    name , exchange = elastic_queue_config.values()
    print(f'Opening the Broker Channel')
    broker_channel = manager_instance.get_channel()
    try:
        broker_channel.exchange_declare(exchange=exchange,exchange_type='direct',durable=True)
        broker_channel.queue_declare(queue=name, durable=True)

        message = json.dumps(payload)

        broker_channel.basic_publish(
            exchange='',
            routing_key=name,
            body=message,
            properties=pika.BasicProperties(
                delivery_mode=2
            )
        )
        print(f"✅ Payload successfully published to queue '{name}'")
    except Exception as e:
        print(f"❌ Failed to publish message to '{name}', Error: {e}")
        raise Exception(e)
    finally:
        print(f"Broker Channel Close")
        manager_instance.close_channel()