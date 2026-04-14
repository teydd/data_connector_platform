from django.db import models
from django.conf import settings

class Extraction(models.Model):
    DB = [
        ('postgresql', 'PostgreSQL'),
        ('mysql', 'MySQL'),
        ('mongodb', 'MongoDB'),
        ('clickhouse', 'ClickHouse'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    database_type = models.CharField(
    max_length=20,
    choices=DB,
    null=True,
    blank=True,
    default=None
)
    file_path = models.FileField(upload_to='extractions/', null=True)
    created_at = models.DateTimeField(auto_now=True)
    metadata = models.JSONField(default=dict)
    
    shared_with = models.ManyToManyField(settings.AUTH_USER_MODEL,blank=True, related_name="shared_extractions")

    def __str__(self):
        return f"Extraction {self.id} from {self.database_type} ({self.table})"