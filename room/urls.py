from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.getRooms, name='get-rooms'),
    path('add/', views.addRoom, name='add-room'),
]
