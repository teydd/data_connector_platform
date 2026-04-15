from rest_framework import serializers
from .models import Extraction


class ExtractionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Extraction
        fields = [
            'id', 'user', 'name', 'batch_size', 'created_at',
            'shared_with','connection', 'status', 'host',
            'port','collection', 'result_location'
        ]
        read_only_fields = ['id', 'created_at', 'user', 'result_location']

