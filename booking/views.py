import datetime
from time import time
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotAcceptable
from rest_framework.response import Response
from authentication.role_authentication import IsRoleUserOrAdmin
from .models import Booking
from app_settings.models import AppSettings
from users.models import User
from room.models import Room
from .serializers import BookingSerializer

# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsRoleUserOrAdmin])
def book_room(request):
    room_id = request.data.get('room_id')
    start_date = request.data.get('start_time')
    end_date = request.data.get('end_time')

    if start_date == None or end_date == None or room_id == None:
        raise NotAcceptable('Missing required fields')
    
    start_date = start_date[: 16]
    end_date = end_date[: 16]

    start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d %H:%M')
    end_date = datetime.datetime.strptime(end_date, '%Y-%m-%d %H:%M')

    if end_date <= start_date:
        raise NotAcceptable(detail="End date must be greater than start date.")

    settings = AppSettings.objects.first()

    if not settings.IS_OPEN:
        raise NotAcceptable(detail="The booking system is currently closed.")

    if start_date <= datetime.datetime.now():
        raise NotAcceptable(detail="Cannot book in the past.")

    s_d = start_date.date()
    e_d = end_date.date()
    s_t = start_date.time()
    e_t = end_date.time()

    # Make sure that the user is making bookings for the correct days
    dt_start = settings.START_DATE
    dt_end = settings.END_DATE
    if not (s_d >= dt_start and e_d <= dt_end):
        raise NotAcceptable('Incorrect date range')

    # Make sure the time is not intersecting with the lunch time
    lunch_start = settings.LUNCH_START
    lunch_end = settings.LUNCH_END
    if not (lunch_start >= e_t or lunch_end <= s_t):
        raise NotAcceptable('This slot is intersecting with lunch time.')

    # Make sure that the user is making requests for the correct times
    if start_date.weekday() < 5:
        s = settings.WEEKDAYS_START
        e = settings.WEEKDAYS_END
        print('is weekday')
        if not (s_t >= s and e_t <= e):
            raise NotAcceptable('Incorrect time range for this day')
    elif start_date.weekday() == 5:
        s = settings.SATURDAY_START
        e = settings.SATURDAY_END
        if not (s_t >= s and e_t <= e):
            raise NotAcceptable('Incorrect time range for this day')
    else:
        raise NotAcceptable('Closed on Sundays')

    # Make sure that the room is not already booked
    existing_bookings = Booking.objects.filter(
        Q(room_id=room_id),
        Q(start_time__lt=start_date, end_time__gt=start_date) |
        Q(start_time__lt=end_date, end_time__gt=end_date) |
        Q(start_time__gte=start_date, end_time__lte=end_date)
    )

    if existing_bookings.count() != 0:
        raise NotAcceptable("Room is booked during this time slot.")
    
    user_id = request.user.id
    if request.user.role == 'AD' and request.data.get('user_id') is not None:
        # Admin is creating booking for someone else
        user_id = request.data.get('user_id')

    # Make sure the user does not already have a booking for the current time
    existing_bookings = Booking.objects.filter(
        Q(user_id=user_id),
        Q(start_time__lt=start_date, end_time__gt=start_date) |
        Q(start_time__lt=end_date, end_time__gt=end_date) |
        Q(start_time__gte=start_date, end_time__lte=end_date)
    )
    if existing_bookings.count() != 0:
        raise NotAcceptable("You already have a booking during or intersecting with this time slot.")
    
    room = Room.objects.get(id=room_id)
    user = User.objects.get(id=user_id)

    booking = Booking.objects.create(
        user_id=user,
        room_id=room,
        start_time=start_date,
        end_time=end_date
    )
    booking.save()
    return Response(status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsRoleUserOrAdmin])
def delete_booking(request):
    booking_id = request.data.get('booking_id')
    if booking_id == None:
        raise NotAcceptable('Missing required fields')
    booking = None
    try:
        booking = Booking.objects.get(id=booking_id)
    except Booking.DoesNotExist:
        raise NotAcceptable('Booking does not exist')
    if booking.user_id.id != request.user.id and request.user.role != 'AD':
        raise NotAcceptable("You can only delete your own bookings.")
    booking.delete()
    return Response(status=200)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsRoleUserOrAdmin])
def get_bookings(request):
    start_date = request.data.get('start_time')
    end_date = request.data.get('end_time')
    room_id = request.data.get('room_id')
    if start_date == None or end_date == None or room_id == None:
        raise NotAcceptable('Missing required fields')

    if end_date <= start_date:
        raise NotAcceptable(detail="End date must be greater than start date.")

    user_id = request.data.get('user_id')
    bookings = None
    if user_id != None:
        bookings = Booking.objects.filter(
            room_id=room_id, user_id=user_id, start_time__gte=start_date, end_time__lte=end_date
        )
    else:
        bookings = Booking.objects.filter(
            room_id=room_id, start_time__gte=start_date, end_time__lte=end_date
        )

    return Response(BookingSerializer(bookings, many=True).data)