from enum import Enum
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


from .managers import UserManager


class User(AbstractUser):
    username = None
    name = models.CharField(max_length=255)
    email = models.EmailField('email adress', unique=True)
    password = models.CharField(max_length=255)

    class Role(models.TextChoices):
        ADMIN = 'AD', _('Admin')
        USER = 'US', _('User')
        UNVERIFIED = 'UV', _('Unverified')

    role = models.CharField(
        max_length=2,
        choices=Role.choices,
        default=Role.UNVERIFIED,
    )


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email
