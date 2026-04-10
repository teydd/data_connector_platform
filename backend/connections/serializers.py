from rest_framework import serializers
from .models import Connection

class DatabaseSerializers(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = ['id', 'name', 'database_type', 'host', 'port', 'database_name', 'username', 'created_at', 'created_by'
        ]
        read_only_fields = ['id', 'created_at', 'created_by']



class DatabaseCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = [
            'name', 'database_type', 'host', 'port', 'database_type', 'username', 'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }