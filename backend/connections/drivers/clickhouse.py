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

    def test_connection(self) -> bool:
        try:
            self.client.execute("SELECT 1")
            print("ClickHouse connection test passed")
            return True
        except Exception as e:
            print(f"ClickHouse connection test failed: {e}")
            return False
        
    def fetch_tables(self) -> list:
        result = self.client.execute("SHOW TABLES")
        return [row[0] for row in result]
    
    def fetch_data(self, table, batch_size = 100, offset = 0):
        total_result = self.client.execute(f"SELECT COUNT(*) FROM `{table}`")
        total = total_result[0][0]

        result, columns_info = self.client.execute(
            f"SELECT * FROM `{table}` LIMIT %(limit)s OFFSET %(offset)s",
            {'limit': batch_size, 'offset': offset},
            with_column_types=True
        )

        columns = [col[0] for col in columns_info]
        rows = [dict(zip(columns, row)) for row in result]

        return {"columns": columns, "rows": rows, "total": total}

    def query(self, query):
        return self.client.execute(query).result_rows
    
    def close(self):
        if self.client:
            self.client.disconnect()
            print("ClickHouse connection closed")