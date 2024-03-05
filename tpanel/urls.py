
from django.urls import path
from . import views

urlpatterns = [
    path('', views.main),
    path('mail', views.mail),
    path('tasks', views.tasks),
    path('notifications', views.notifications),
    path('<path:page>', views.not_found)
]
