from django.db import models

# Create your models here.
class AppSettings(models.Model):
    WEEKDAYS_START = models.TimeField()
    WEEKDAYS_END = models.TimeField()
    SATURDAY_START = models.TimeField()
    SATURDAY_END = models.TimeField()
    ALLOW_SUNDAY = models.BooleanField()
    IS_OPEN = models.BooleanField(default=True)

    LUNCH_START = models.TimeField()
    LUNCH_END = models.TimeField()

    START_DATE = models.DateField()
    END_DATE = models.DateField()

    def save(self):
        count = AppSettings.objects.all().count()
        save_permission = AppSettings.has_add_permission(self)

        if count < 2:
            super(AppSettings, self).save()
        elif save_permission:
            super(AppSettings, self).save()

    def has_add_permission(self):
        return AppSettings.objects.filter(id=self.id).exists()