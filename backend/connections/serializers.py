from rest_framework import serializers
from .models import Connection

class DatabaseUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = "__all__"
        read_only_fields = ['id', 'created_at', 'created_by']



class DatabaseCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = [
            'database_type', 'host', 'port', 'database_name', 'username', 'password','id'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }