from rest_framework import serializers
from .models import Extraction


class ExtractionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Extraction
        fields = [
        'id', 'user', 'table', 'file_path', 'metadata', 'created_at', 'shared_with']
        read_only_fields = ['id', 'created_at', 'user']

        
