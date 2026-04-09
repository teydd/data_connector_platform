import psycopg2
from .root import RootDriver


class PostgresqlConnector(RootDriver):

    def connect(self):
        #local storage
        self.conn = psycopg2.connect(
            host = self.config['host'],
            port = self.config['port'],
            user = self.config['username'],
            password = self.config['password'],
            database = self.config['database_name'],
            connect_timeout=10
        )
        print("Connected to PostgreSQL")

    def query(self,query):
        cursor = self.conn.cursor()
        cursor.execute(query)
        return cursor.fetchall()
    

    def test_connection(self):
        try:
            cursor = self.conn.cursor()
            cursor.execute("SELECT 1")
            print("Connected to PostgreSQL successfully")
            return True
        except Exception as e:
            print('Unsuccessful connection to PostgreSQL')
            return False
        
    def fetch_tables(self):
       cursor = self.conn.cursor()
       cursor.execute("""
                SELECT table_name
                FROM information_schema.tables
                WHERE table_schema='public'
            """)
       return [row[0] for row in cursor.fetchall()]
    
    def fetch_data(self, table: str, batch_size: int = 100, offset: int = 0) -> dict:
        cursor = self.conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cursor.execute(f'SELECT COUNT(*) FROM "{table}"')
        total = cursor.fetchone()['count']

        cursor.execute(
            f'SELECT * FROM "{table}" LIMIT %s OFFSET %s',
            (batch_size, offset)
        )
        rows = cursor.fetchall()

        columns = [desc[0] for desc in cursor.description]

        return {
            "columns": columns,
            "rows": rows,
            "total": total
        }
        


    def close(self):
        self.conn.close()
        print("PostgreSQL connection closed")