# Generated by Django 4.0.2 on 2022-03-04 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_settings', '0004_appsettings_is_open'),
    ]

    operations = [
        migrations.AddField(
            model_name='appsettings',
            name='LUNCH_END',
            field=models.TimeField(default='13:00'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='appsettings',
            name='LUNCH_START',
            field=models.TimeField(default='12:00'),
            preserve_default=False,
        ),
    ]
