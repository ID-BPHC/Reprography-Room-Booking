# Generated by Django 4.0.2 on 2022-02-27 07:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_rename_year_in_school_user_role'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='role',
        ),
    ]
