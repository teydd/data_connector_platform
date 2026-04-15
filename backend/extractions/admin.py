from django.contrib import admin
from .models import Extraction

@admin.register(Extraction)
class ExtractionAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "connection", "status", "created_at")
    list_filter = ("connection", "status")
    search_fields = ("name", "host", "collection")
