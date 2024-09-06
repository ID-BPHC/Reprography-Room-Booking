from django.db import models

# Create your models here.
class Room(models.Model):
    room_no = models.CharField(max_length=4)
    block = models.CharField(max_length=1)
    
    class Meta:
        unique_together = ('room_no', 'block',)

    def __str__(self):
        return str(self.block) + str(self.room_no)