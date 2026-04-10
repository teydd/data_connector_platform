from .mongodb import MongoDBConnector
from .clickhouse import ClickHouseConnector
from .mysql import MySqlConnector
from .postgres import PostgresqlConnector

def get_connector(config):
    db_type = config['database_type']

    if db_type == 'postgresql':
        return PostgresqlConnector(config)
    elif db_type == 'mysql':
        return MySqlConnector(config)
    elif db_type == 'mongodb':
        return MongoDBConnector(config)
    elif db_type == 'clickhouse':
        return ClickHouseConnector(config)
    else:
        raise ValueError(f"Unsupported database type: {db_type}") 