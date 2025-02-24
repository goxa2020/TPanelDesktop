# Getting Started with this project

## install all dependencies

### python
First step:
`cd backend_django`\
Django project has requirements.txt with all python dependencies\
To install you need write: `pip install -r requirements.txt` in your venv

You also need to run migrations: `py manage.py makemigrations`, `py manage.py migrate `
### node
First step:
`cd react-fron-app`\
To install react dependencies just run `npm install`.\
It will resolve the required dependencies from the package.json file.

## Start app

To start this app you need:

### react

In one terminal write:
`cd react-front-app` 
`npm start` to start react app

### django

In another terminal write
`cd backend_django`
`python manage.py runserver` to run django api server
