from django.urls import path
from . import views

urlpatterns = [
    path('', views.getSettings, name='get-settings'),
    path('update/', views.updateSettings, name='update-settings'),
]
