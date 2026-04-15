from clickhouse_driver import Client
from .root import RootDriver

class ClickHouseConnector(RootDriver):

    def connect(self):
        self.client = Client(
            host = self.config['host'],
            port = self.config['port'],
            username = self.config['username'],
            password = self.config['password'],
            database = self.config['database_name'],
            connect_timeout=10
        )
        print("Connected to ClickHouse")

    def test_connection(self):
        try:
             self.connect()
             self.client.execute("SELECT 1")
             return True, "ClickHouse connection successful"
        except Exception as e:
             return False, str(e)
        finally:
            self.close()
        
    def fetch_tables(self) -> list:
         result = self.client.execute(f"SHOW TABLES FROM {self.config['database_name']}")
         return [row[0] for row in result]
    
    def fetch_data(self, table, batch_size=100, offset=0):
        if not table.isidentifier():
            raise ValueError("Invalid table name")
        total_result = self.client.execute(f"SELECT COUNT(*) FROM `{table}`")
        total = total_result[0][0]

        result,columns_info = self.client.execute(
            f"SELECT * FROM `{table}` LIMIT %(limit)s OFFSET %(offset)s", with_column_types=True
        )
        columns = [col[0] for col in columns_info]
        rows = [dict(zip(columns, row)) for row in result]
        return {"columns": columns, "rows": rows, "total":total}
         

    def query(self, query):
        return self.client.execute(query)
    
    def close(self):
        if hasattr(self, "client") and self.client:
             self.client.disconnect()
             print("ClickHouse connection closed")