from django.urls import path, include
from . import views

urlpatterns = [
    path('auth/', include('authentication.urls')),
    path('admin/', include('admin.urls')),
    path('room/', include('room.urls')),
    path('booking/', include('booking.urls')),
    path('settings/', include('app_settings.urls')),
]
