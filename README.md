# Reprography Room Booking Website
Made using Django, React & PostgreSQL.


Check it out here: https://reprography.bits-hyderabad.ac.in/

## Installation

### Backend
It is recommended to use Pipenv to install Python packages:
```
cd Repro-Room-Booking/
pipenv shell
pipenv install
```
Next, run migrations and start the server:
```
python manage.py migrate
```
Create a superuser for Django admin:
```
python manage.py createsuperuser
```
Finally, run the server:
```
python manage.py runserver 0.0.0.0:8000
```
### Frontend
Install NPM dependencies
```
cd frontend/
yarn install
```
Set the base URL for the backend in `./frontend/src/constants/index.js`

Finally, run the frontend server:
```
yarn start
```
