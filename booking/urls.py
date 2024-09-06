from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.get_bookings, name='get_bookings'),
    path('new/', views.book_room, name='book_room'),
    path('delete/', views.delete_booking, name='delete_booking'),
]
