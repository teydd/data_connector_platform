import psycopg2
from .root import RootDriver


class Postgresql(RootDriver):

    def connect(self):
        #local storage
        self.conn = psycopg2.connect(
            host = self.config['host'],
            port = self.config['port'],
            user = self.config['username'],
            password = self.config['password'],
            database = self.config['database_name']
        )

        self.cursor = self.conn.cursor()
        print("Connected to PostgreSQL")

    def query(self,query):
        self.cursor.execute(query)
        return self.cursor.fetchall()
    

    def test_connection(self):
        try:
            self.cursor.execute("SELECT 1")
            print("Connected to PostgreSQL successfully")
            return True
        except Exception as e:
            print(f'Unsuccessful connection to PostgreSQL')
            return False

    def close(self):
        self.cursor.close()
        self.conn.close()
        print("PostgreSQL connection closed")