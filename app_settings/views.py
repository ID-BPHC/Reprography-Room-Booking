from http.client import NOT_ACCEPTABLE
from .models import AppSettings as Settings
from .serializers import SettingsSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotAcceptable
from authentication.role_authentication import IsRoleAdmin, IsRoleUserOrAdmin

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsRoleUserOrAdmin])
def getSettings(request):
    settings = Settings.objects.first()
    return Response(SettingsSerializer(settings).data)

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsRoleAdmin])
def updateSettings(request):
    settings = Settings.objects.first()
    weekdays_start = request.data.get('WEEKDAYS_START')
    weekdays_end = request.data.get('WEEKDAYS_END')
    saturday_start = request.data.get('SATURDAY_START')
    saturday_end = request.data.get('SATURDAY_END')
    allow_sunday = request.data.get('ALLOW_SUNDAY')
    is_open = request.data.get('IS_OPEN')
    start_date = request.data.get('START_DATE')
    end_date = request.data.get('END_DATE')
    lunch_start = request.data.get('LUNCH_START')
    lunch_end = request.data.get('LUNCH_END')

    if weekdays_start is None or weekdays_end is None or saturday_start is None \
        or saturday_end is None or allow_sunday is None \
        or start_date is None or end_date is None or is_open is None \
        or lunch_start is None or lunch_end is None:
        return NotAcceptable('Missing parameters')

    settings.WEEKDAYS_START = weekdays_start
    settings.WEEKDAYS_END = weekdays_end
    settings.SATURDAY_START = saturday_start
    settings.SATURDAY_END = saturday_end
    settings.ALLOW_SUNDAY = allow_sunday
    settings.IS_OPEN = is_open
    settings.START_DATE = start_date
    settings.END_DATE = end_date
    settings.LUNCH_START = lunch_start
    settings.LUNCH_END = lunch_end

    settings.save()
    return Response(status=200)