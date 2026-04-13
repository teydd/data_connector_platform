from django.db import models
from django.conf import settings
from connections.models import Connection


class Extraction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    database_type = models.ForeignKey(Connection, on_delete=models.CASCADE, null=True, blank=True)
    table = models.CharField(max_length=255, null=True)
    file_path = models.FileField(upload_to='extractions/', null=True)
    created_at = models.DateTimeField(auto_now=True)
    metadata = models.JSONField(default=dict)
    
    shared_with = models.ManyToManyField(settings.AUTH_USER_MODEL,blank=True, related_name="shared_extractions")

    def __str__(self):
        return f"Extraction {self.id} from {self.database_type} ({self.table})"