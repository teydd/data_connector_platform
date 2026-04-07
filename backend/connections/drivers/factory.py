from .mongodb import MongoDBConnector
from .clickhouse import ClickHouseConnector
from .mysql import MySqlConnector
from .postgres import PostgresqlConnector

def get_connector(config):
    if config.database_type == 'postgresql':
        return PostgresqlConnector(config)
    elif config.database_type == 'mysql':
        return MySqlConnector(config)
    elif config.database_type == 'clickhouse':
        return ClickHouseConnector(config)
    elif config.database_type == 'mongodb':
        return MongoDBConnector(config) 
    else:
        return ValueError("Unsupported database type")