# Generated by Django 4.0.2 on 2022-02-27 13:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('room', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='room',
            unique_together={('room_no', 'block')},
        ),
    ]
