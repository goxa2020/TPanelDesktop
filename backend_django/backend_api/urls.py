from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('', views.get_routes, name='get_routes'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/<int:id>', views.UserView.as_view(), name='user_details'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('project/<int:id>', views.ProjectView.as_view(), name='project_actions'),
    path('project/add', views.ProjectCreateView.as_view(), name='create_project'),
    path('projects/', views.ProjectsView.as_view(), name='get_projects'),
    path('task/<int:id>', views.TaskView.as_view(), name='task_details'),
    path('task/add', views.TaskCreateView.as_view(), name='create_task'),
    path('tasks/', views.TasksView.as_view(), name='get_tasks'),
]
