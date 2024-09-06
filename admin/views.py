from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from authentication.role_authentication import IsRoleAdmin
from rest_framework.response import Response
from rest_framework.exceptions import NotAcceptable
from django.core.validators import validate_email
from .serializers import UserSerializer
from users.models import User
from room.models import Room

@api_view(['GET'])
@permission_classes((IsAuthenticated, IsRoleAdmin, ))
def getUnverifiedUsers(request):

    unverified_users = User.objects.filter(role = 'UV');
    serializer = UserSerializer(unverified_users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes((IsAuthenticated, IsRoleAdmin, ))
def getVerifiedUsers(request):

    unverified_users = User.objects.filter(role = 'US');
    serializer = UserSerializer(unverified_users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes((IsAuthenticated, IsRoleAdmin, ))
def verifyUser(request):
    user_id = request.data.get('user_id')
    user = User.objects.get(id = user_id)
    user.role = 'US'
    user.save()
    return Response(status=200)

@api_view(['POST'])
@permission_classes((IsAuthenticated, IsRoleAdmin, ))
def unverifyUser(request):
    user_id = request.data.get('user_id')
    user = User.objects.get(id = user_id)
    user.role = 'UV'
    user.save()
    return Response(status=200)

@api_view(['POST'])
@permission_classes((IsAuthenticated, IsRoleAdmin, ))
def createUser(request):
    email = request.data.get('email')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')

    if email == None or first_name == None or last_name == None:
        raise NotAcceptable('Email, first name and last name are required')

    try:
        validate_email(email)
    except:
        raise NotAcceptable('Email is not invalid')
    
    if '@hyderabad.bits-pilani.ac.in' not in email:
        raise NotAcceptable('Only BITSMail is allowed')

    try:
        user = User.objects.create(email = email, first_name = first_name, last_name = last_name, role = 'US')
        user.save()
    except:
        raise NotAcceptable('An error occurred probably because the user already exists.')
    return Response(status=200)