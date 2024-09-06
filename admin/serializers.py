from rest_framework import serializers
from users.models import User
from room.models import Room

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'role', 'first_name', 'last_name')

