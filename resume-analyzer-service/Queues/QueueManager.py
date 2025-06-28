import pika

from Utils.EnvUtils import get_env_value



class QueueManager:
    connection = None
    channel = None
    def __init__(self):
        self.rabbitmq_host = get_env_value('AMQP_URL')
        self.rabbitmq_port = int(get_env_value('AMQP_PORT'))
        self.rabbitmq_heartbeat = int(get_env_value('AMQP_HEARTBEAT'))

    def initialize_connection(self):
        try:
            if self.connection is None and self.channel is None:
                self.connection = pika.BlockingConnection(pika.ConnectionParameters(host=self.rabbitmq_host,port=self.rabbitmq_port,heartbeat=self.rabbitmq_heartbeat))
                self.channel = self.connection.channel()
        except Exception as error:
            print(f'Error Initializing the RabbitMQ Connection, Due To {error}')


    def get_channel(self):
        if self.channel is None:
            self.initialize_connection()
            return self.channel

    def close_channel(self):
        if self.channel:
            self.channel.close()
            self.channel = None
            return True


def get_queue_manager_instances():
    return QueueManager()
