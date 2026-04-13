import pymysql
from .root import RootDriver

class MySqlConnector(RootDriver):

    def connect(self):
        self.conn = pymysql.connect(
            host = self.config['host'],
            port = self.config['port'],
            user = self.config['username'],
            password = self.config['password'],
            database = self.config['database_name'],
            connect_timeout=10
        )
        print("Connected to MySQL")

    
    def query(self, query,params=None):
        with self.conn.cursor() as cursor:
            cursor.execute(query,params)
            return cursor.fetchall()

    def fetch_tables(self):
        cursor = self.conn.cursor()
        cursor.execute("SHOW TABLES")
        return [row[0] for row in cursor.fetchall()]
    
    def fetch_data(self, table, batch_size = 100, offset = 0):
        cursor = self.conn.cursor(pymysql.cursors.DictCursor)

        cursor.execute(f"SELECT COUNT(*) AS cnt FROM `{table}` ")
        total = cursor.fetchone()['cnt']

        cursor.execute(
            f"SELECT * FROM `{table}` LIMIT %s OFFSET %s",
            (batch_size, offset)
        )
        rows = cursor.fetchall()
        columns = [desc[0] for desc in cursor.description] if cursor.description else []

        return {"columns" : columns, "rows" : rows, "total" : total}


    def test_connection(self):
        try:
            cursor = self.conn.cursor()
            cursor.execute("SELECT 1")
            result = self.cursor.fetchone()
            return result is not None
        except Exception as e:
            print(f"Connection test failed: {e}")
            return False
        
    def close(self):
        self.cursor.close()
        self.conn.close()
        print("My SQL connection closed")