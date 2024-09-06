"""
Add multiple users at once using a CSV file
Make a CSV File (without headers) which must include the following:
Name, Email
The CSV file must be there in the same directory as this script
Next, update the NAME_INDEX and EMAIL_INDEX and CSV_FILE_NAME to match the CSV file
If the NAME is the first column in the CSV file, then NAME_INDEX = 0
If the EMAIL is the second column in the CSV file, then EMAIL_INDEX = 1
Next, set the TOKEN to the admin token for authorization
"""

"""
Set the following variables according to the format of the CSV file
"""
NAME_INDEX = 1
EMAIL_INDEX = 3
CSV_FILE_NAME = 'details.csv'

"""
Set the TOKEN to the admin token for authorization
Create a request from the admin page and inspect it using the network tab
The token will be visible in the Authorization header of the request
Authorization: Bearer <token>
Set this token here
"""
TOKEN = '<insert the token here>'

import csv
from email import header
import requests

file = open(CSV_FILE_NAME, 'r')



def split_name(name):
    name = name.split(' ')
    if len(name) == 0:
        return None
    first_name = name[0]
    last_name = name[1: ]
    return (first_name.strip(), ' '.join(last_name).strip())

def insert_data(first_name, last_name, email):
    try:
        r = requests.post('https://reprography.bits-hyderabad.ac.in/api/v1/admin/create/', data = {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
        }, headers = {
            'Authorization': 'Bearer ' + TOKEN
        })
        print(r.text)
        if (r.status_code == 200):
            print(f'Successfully added {first_name} {last_name}')
        else:
            print(f'Failed to add {first_name} {last_name}')
    except Exception as e:
        print(f'Failed to add {first_name} {last_name}')

csvreader = csv.reader(file)
for row in csvreader:
    name = row[NAME_INDEX]
    email = row[EMAIL_INDEX]
    first_name, last_name = split_name(name)
    insert_data(first_name, last_name, email)