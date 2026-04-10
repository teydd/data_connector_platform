from django.db import models
from django.conf import settings
class Connection(models.Model):
    DB = [
        ('postgres', 'PostgreSQL'),
        ('mysql', 'MySQL'),
        ('mongodb', 'MongoDB'),
        ('clickhouse', 'ClickHouse')
    ]

    name = models.CharField(max_length=100)
    database_type = models.CharField(max_length=20, choices=DB)

    host = models.CharField(max_length=255, blank=True, null=True)
    port = models.IntegerField(blank=True, null=True)

    username = models.CharField(max_length=255, blank=True, null=True)
    password = models.TextField(blank=True, null=True)

    database_name = models.CharField(max_length=255, blank=True, null=True)

    uri = models.TextField(blank=True , null=True)

    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.database_type})"
