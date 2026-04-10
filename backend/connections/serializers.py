from rest_framework import serializers
from .models import Connection

class DatabaseSerializers(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at', 'created_by']