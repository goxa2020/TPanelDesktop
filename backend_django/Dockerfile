FROM python:3.11-alpine AS builder
LABEL authors="goxa"

EXPOSE 8000
WORKDIR /app
COPY requirements.txt /app
RUN pip3 install -r requirements.txt --no-cache-dir

COPY . /app

RUN python3 manage.py makemigrations
RUN python3 manage.py migrate
#RUN python3 manage.py createsuperuser goxa1@vk.com qawsed12

ENTRYPOINT ["python3"]
CMD ["manage.py", "runserver", "0.0.0.0:8000"]
