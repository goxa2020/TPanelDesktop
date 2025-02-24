from .models import User, Project, Task
from .serializers import RegisterSerializer, ProjectSerializer, TaskSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


class UserView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    lookup_field = 'id'


@api_view(['GET'])
def get_routes(request):
    routes = [
        '/api/',
        '/api/token/',
        '/api/token/refresh/',
        '/api/register/',
        '/api/projects/'
    ]
    return Response(routes)


class ProjectsView(generics.ListAPIView):
    queryset = Project.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if not queryset:
            return Response([], status=status.HTTP_204_NO_CONTENT)
        serializer = ProjectSerializer(queryset, many=True)
        return Response(serializer.data)

    def filter_queryset(self, queryset):
        user_id = self.request.query_params.get('user_id')

        if not user_id:
            return queryset

        user: User = User.objects.filter(id=user_id).first()

        if not user:
            return

        if user.is_student:
            projects = queryset.filter(students=user).all()
            return projects

        if user.is_teacher:
            projects = queryset.filter(teacher=user).all()
            return projects


class ProjectView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSerializer
    lookup_field = 'id'


class ProjectCreateView(generics.CreateAPIView):
    queryset = Project.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSerializer


class TaskView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer
    lookup_field = 'id'


class TaskCreateView(generics.CreateAPIView):
    queryset = Task.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer


class TasksView(generics.ListAPIView):
    queryset = Task.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer
