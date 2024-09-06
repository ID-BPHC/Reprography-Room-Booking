from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from authentication.role_authentication import IsRoleAdmin, IsRoleUserOrAdmin
from rest_framework.response import Response
from .serializers import RoomSerializer
from .models import Room

# Create your views here.
@api_view(['GET'])
@permission_classes((IsAuthenticated, IsRoleUserOrAdmin, ))
def getRooms(request):
    rooms = Room.objects.all();
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAuthenticated, IsRoleAdmin, ))
def addRoom(request):
    try:
        room_no = request.data.get('room_no')
        block = request.data.get('block')
        room = Room(room_no = room_no, block = block)
        room.save()
        return Response(status=200)
    except Exception as e:
        return Response(status=400)