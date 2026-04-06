# db_drivers/mongodb.py

from pymongo import MongoClient
from .root import RootDriver

class MongoDriver(RootDriver):

    def __init__(self, config):
        self.config = config
        self.client = None

    def connect(self):
        self.client = MongoClient(self.config.uri)

    def test_connection(self):
        try:
            self.connect()
            self.client.server_info()
            return True
        except Exception as e:
            return str(e)
        finally:
            if self.client:
                self.client.close()

    def close(self):
        if self.client:
            self.client.close()