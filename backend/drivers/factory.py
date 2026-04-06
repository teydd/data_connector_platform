# db_drivers/factory.py

from .postgres import PostgresDriver
from .mongodb import MongoDriver

class DriverFactory:

    DRIVERS = {
        "postgres": PostgresDriver,
        "mongodb": MongoDriver,
    }

    @classmethod
    def get_driver(cls, db_connection):
        driver_class = cls.DRIVERS.get(db_connection.db_type)

        if not driver_class:
            raise Exception("Unsupported DB type")

        return driver_class(db_connection)