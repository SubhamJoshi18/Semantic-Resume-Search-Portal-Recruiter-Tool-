import sys
from Queues.QueueManager import get_queue_manager_instances
from Consumer.ResumeExtractionConsumer import consume_resume_extraction


def start_all_the_services():
    try:
        queue_manager_instance = get_queue_manager_instances()
        queue_channel = queue_manager_instance.get_channel()
        consume_resume_extraction(queue_channel)
    except Exception as error:
        print(f'Error Starting All the Services : {error}')
        print(f'Closing the Service')
        sys.exit(1)


if __name__ == "__main__":
    start_all_the_services()