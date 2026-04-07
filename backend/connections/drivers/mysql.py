import pymysql
from .root import RootDriver

class MySql(RootDriver):

    def connect(self):
        self.conn = pymysql.connect(
            host = self.config['host'],
            port = self.config['port'],
            user = self.config['username'],
            password = self.config['password'],
            database = self.config['database_name']
        )

        self.cursor = self.conn.cursor()
        print("Connected to MySQL")

    
    def query(self, query):
        self.cursor.execute(query)
        return self.cursor.fetchall()

    
    def test_connection(self):
        try:
            self.cursor.execute("SELECT 1")
            result = self.cursor.fetchone()
            return result is not None
        except Exception as e:
            print(f"Connection test failed: {e}")
            return False
        
    def close(self):
        self.cursor.close()
        self.conn.close()
        print("My SQL connection closed")