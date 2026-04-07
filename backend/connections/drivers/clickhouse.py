from clickhouse_driver import Client
from .root import RootDriver

class ClickHouse(RootDriver):

    def connect(self):
        self.client = Client(
            host = self.config['host'],
            port = self.config['port'],
            username = self.config['username'],
            password = self.config['password'],
            database = self.config['database_name']
        )
        print("Connected to ClickHouse")

    def test_connection(self):
        try:
            self.client.execute("SELECT 1")
            print("ClickHouse connection test passed")
            return True
        except Exception as e:
            print("ClickHouse connecion test failed: {e}")
            return False

    def query(self, query):
        return self.client.query(query).result_rows
    
    def close(self):
        print("ClickHouse connection closed")