from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Booking

class BookingSerializer(ModelSerializer):
    user_first_name = serializers.CharField(source='user_id.first_name', read_only=True)
    user_last_name = serializers.CharField(source='user_id.last_name', read_only=True)
    room_no = serializers.CharField(source='room_id.room_no', read_only=True)
    block = serializers.CharField(source='room_id.block', read_only=True)
    class Meta:
        model = Booking
        fields = ('id', 'room_id', 'room_no', 'block', 'user_id', 'user_first_name', 'user_last_name', 'start_time', 'end_time')