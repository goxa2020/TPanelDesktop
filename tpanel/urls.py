
from django.urls import path
from . import views

urlpatterns = [
    path('', views.main),
    path('mail', views.mail),
    path('<page>', views.not_found),
]
