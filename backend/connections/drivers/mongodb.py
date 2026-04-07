from pymongo import MongoClient
from .root import RootDriver

class MongoDBConnector(RootDriver):

    def connect(self):
        #local storage
        self.conn = MongoClient(
            host = self.config['host'],
            port = self.config['port']
        )
        self.db = self.conn[self.config.get('database')]
        print("Connected to Mongo DB")

    def test_connection(self):
       try:
           return self.conn and self.conn.admin.command('ping') == {'ok':1.0}
       except:
           return False
       
    def query(self, collection_name, filter_query=None):
        try:
            return list(self.db[collection_name].find(filter_query or {}))
        except:
            return []

    def close(self):
        if self.conn:
            self.conn.close()
            print("MongoDB cnnection closed")