# Generated by Django 4.0.2 on 2022-02-28 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AppSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('WEEKDAYS_START', models.TimeField(default='09:00')),
                ('WEEKDAYS_END', models.TimeField(default='17:00')),
                ('SATURDAY_START', models.TimeField(default='09:00')),
                ('SATURDAY_END', models.TimeField(default='12:00')),
                ('ALLOW_SUNDAY', models.BooleanField(default=False)),
                ('START_DATE', models.DateField()),
                ('END_DATE', models.DateField()),
            ],
        ),
    ]
