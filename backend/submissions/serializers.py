from .models import Submission
from rest_framework import serializers


class SubmissionSerializers(serializers.ModelSerializer):
    connection_type = serializers.CharField(source="connection.database_type",read_only=True)
    
    class Meta:
        model = Submission
        fields = "__all__"
        read_only_fields = [
            'id', 'submitted_at', 'user', 'connection_type'
        ]