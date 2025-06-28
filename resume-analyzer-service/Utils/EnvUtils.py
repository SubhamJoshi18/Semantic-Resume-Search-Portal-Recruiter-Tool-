import os

from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

def get_env_value(key : str) -> str:
    return os.getenv(key)