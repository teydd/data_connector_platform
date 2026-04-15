from rest_framework import serializers
from django.conf import settings
from .models import Extraction

class ExtractionSerializers(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = Extraction
        fields = [
            'id', 'user', 'name', 'batch_size', 'created_at',
            'password', 'dbname', 'username', 'shared_with',
            'connection', 'status', 'host', 'port', 'collection',
            'result_location', 'file_url'
        ]
        read_only_fields = ['id', 'created_at', 'user', 'result_location', 'file_url']

    def get_file_url(self, obj):
        # If result_location is a FileField or path, build a full URL
        if obj.result_location:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.result_location.url) \
                   if hasattr(obj.result_location, 'url') \
                   else f"{settings.MEDIA_URL}{obj.result_location}"
        return None
