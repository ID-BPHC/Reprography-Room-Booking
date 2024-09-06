from django.db import models
from room.models import Room
from users.models import User

# Create your models here.
class Booking(models.Model):
    room_id = models.ForeignKey('room.Room', on_delete=models.CASCADE)
    room_no = models.CharField(max_length=4)
    user_id = models.ForeignKey('users.User', on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return str(self.room_id) + " " + str(self.user_id) + " " + str(self.start_time) + " " + str(self.end_time)