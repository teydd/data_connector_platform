from django.db import models
from django.conf import settings

class Extraction(models.Model):
    DB = [
        ('postgresql', 'PostgreSQL'),
        ('mysql', 'MySQL'),
        ('mongodb', 'MongoDB'),
        ('clickhouse', 'ClickHouse'),
    ]
    STATUS = [
        ('pending', "Pending"),
        ('running', 'Running'),
        ('completed', 'Completed'),
        ('failed', 'Failed')

    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    connection = models.CharField(max_length=20,choices=DB,null=True,blank=True,default=None)
    name = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    batch_size = models.IntegerField(default=100)
    host = models.CharField(max_length=255, null=True,blank=True)
    port = models.IntegerField(null=True,blank=True)
    collection = models.CharField(max_length=255, null=True, blank=True) 
    status = models.CharField(choices=STATUS, max_length=20, default='pending') 
    result_location = models.CharField(max_length=255, null=True, blank=True)  
    shared_with = models.ManyToManyField(settings.AUTH_USER_MODEL,blank=True, related_name="shared_extractions")
    username = models.CharField(max_length=255, null=True, blank=True)
    password = models.CharField(max_length=255, null=True, blank=True)
    dbname = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"Extraction {self.id} from {self.connection} ({self.name})"