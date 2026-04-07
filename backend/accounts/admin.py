from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'role', 'is_active', 'date_joined','first_name', 'last_name']
    list_filter = ['role', 'is_active', 'date_joined']
    search_fields = ['username', 'email']
    ordering = ['-date_joined']
    readonly_fields = ['date_joined', 'last_login']
    
    fieldsets = (
        ('Personal Info', {
            'fields': ('username', 'email', 'first_name', 'last_name')
        }),
        ('Permissions', {
            'fields': ('role', 'is_active', 'is_staff', 'is_superuser')
        }),
        ('Important dates', {
            'fields': ('date_joined', 'last_login'),
            'classes': ('collapse',)
        }),
    )
