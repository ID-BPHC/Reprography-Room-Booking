# Generated by Django 4.0.2 on 2022-02-27 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_user_managers'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='year_in_school',
            field=models.CharField(choices=[('AD', 'Admin'), ('US', 'User'), ('UV', 'Unverified')], default='UV', max_length=2),
        ),
    ]
