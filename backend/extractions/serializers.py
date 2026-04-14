from rest_framework import serializers
from .models import Extraction


class ExtractionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Extraction
        fields = [
        'id', 'user', 'name', 'metadata', 'created_at', 'shared_with','db_type', 'documentation']
        read_only_fields = ['id', 'created_at', 'user']

    from rest_framework import serializers

class BatchExtractionSerializer(serializers.Serializer):
    source = serializers.CharField()
    batch_size = serializers.IntegerField(min_value=1, default=100)
        
