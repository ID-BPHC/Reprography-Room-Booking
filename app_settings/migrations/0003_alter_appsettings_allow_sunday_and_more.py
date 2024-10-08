# Generated by Django 4.0.2 on 2022-03-01 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_settings', '0002_alter_appsettings_allow_sunday_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appsettings',
            name='ALLOW_SUNDAY',
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name='appsettings',
            name='SATURDAY_END',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='appsettings',
            name='SATURDAY_START',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='appsettings',
            name='WEEKDAYS_END',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='appsettings',
            name='WEEKDAYS_START',
            field=models.TimeField(),
        ),
    ]
