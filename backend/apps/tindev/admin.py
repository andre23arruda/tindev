from django.contrib import admin
from rangefilter.filters import DateRangeFilter
from .models import Dev


@admin.register(Dev)
class DevRegister(admin.ModelAdmin):
    list_per_page = 25
    ordering = ['id']
    list_filter = [
        ('created_at', DateRangeFilter),
    ]
