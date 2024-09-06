FROM python:3.9-slim-buster

WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
RUN pip install pipenv

# copy project
COPY . .

RUN pipenv install
RUN pipenv install --system --deploy --ignore-pipfile