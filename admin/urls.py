from django.urls import path, include
from . import views

urlpatterns = [
    path('unverified-users/', views.getUnverifiedUsers, name='unverified-users'),
    path('verified-users/', views.getVerifiedUsers, name='verified-users'),
    path('verify/', views.verifyUser, name='verify'),
    path('unverify/', views.unverifyUser, name='unverify'),
    path('create/', views.createUser, name='create'),
]