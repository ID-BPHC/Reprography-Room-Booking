from rest_framework.serializers import ModelSerializer
from .models import AppSettings as Settings

class SettingsSerializer(ModelSerializer):
    class Meta:
        model = Settings
        fields = '__all__'