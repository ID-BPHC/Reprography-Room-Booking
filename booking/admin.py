from django.contrib import admin
from .models import Booking

class BookingAdmin(admin.ModelAdmin):
    # list_display = ('id', 'room', 'user', 'start_time', 'end_time', 'created_at', 'updated_at')
    # search_fields = ('id', 'room', 'user', 'start_time', 'end_time', 'created_at', 'updated_at')
    # ordering = ('id', 'room', 'user', 'start_time', 'end_time', 'created_at', 'updated_at')
    pass

# Register your models here.
admin.site.register(Booking)