import datetime
from django.apps import AppConfig
from django.dispatch import receiver
from django.db.backends.signals import connection_created

@receiver(connection_created)
def my_receiver(connection, **kwargs):
    print('Established Database connection')
    with connection.cursor() as cursor:
        try:
            cursor.execute("SELECT COUNT(*) FROM app_settings_appsettings")
            count = cursor.fetchone()[0]
            if count == 0:
                start = datetime.datetime.today() + datetime.timedelta(days=1)
                end = start + datetime.timedelta(days=7)
                start = start.strftime('%Y-%m-%d')
                end = end.strftime('%Y-%m-%d')
                cursor.execute(f"""INSERT INTO app_settings_appsettings ("START_DATE", "END_DATE", "WEEKDAYS_START", "WEEKDAYS_END", "ALLOW_SUNDAY", "IS_OPEN", "SATURDAY_START", "SATURDAY_END", "LUNCH_START", "LUNCH_END")
                                    VALUES ('{start}', '{end}', '0900', '1700', false, true, '0900', '1200', '1300', '1400')""")
                print('Created default AppSettings')
            else:
                print('Database already initialized')
        except:
            print('Failed to initialize database')

class AppSettingsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app_settings'
