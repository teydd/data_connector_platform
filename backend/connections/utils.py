#standard format in which the database configurations are sent to the factory
from .drivers.factory import get_connector

def get_connection_config(connection):
     return {
        "database_type": connection.database_type,
        "host": connection.host,
        "port": connection.port,
        "database_name": connection.database_name,
        "username": connection.username,
        "password": connection.password,
        "uri": connection.uri,
    }


def test_connection(connection):
    config = get_connection_config(connection)
    connector = get_connector(config)
    try:
        with connector:
            success, message = connector.test_connection()
        return success, message
    except Exception as e:
        return False, str(e)