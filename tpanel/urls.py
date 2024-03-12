
from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name=''),
    path('mail', views.mail, name='mail'),
    path('tasks', views.tasks, name='tasks'),
    path('notifications', views.notifications, name='notifications'),
    path('profile', views.profile, name='profile'),
    path('<path:page>', views.not_found)
]
