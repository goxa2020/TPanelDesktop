from .models import User, Project, Student, Teacher, Task
from .serializer import RegisterSerializer, MyTokenObtainPairSerializer, ProjectSerializer, TaskSerializer, \
    UserSerializer

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


class UserView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
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
    permission_classes = [AllowAny]
    serializer_class = ProjectSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if not queryset:
            return Response([], status=status.HTTP_204_NO_CONTENT)
        serializer = ProjectSerializer(queryset, many=True)
        return Response(serializer.data)

    # def create(self, request, *args, **kwargs):
    #     print(request.data)
        # teacher_id = request.data.get('teacher_id')
        # if not teacher_id:
        #     print('no teacher id')
        #     return Response([], status=status.HTTP_400_BAD_REQUEST)
        #
        # teacher: Teacher = Teacher.objects.create(**request.data)
        # if not teacher:
        #     print('no teacher found')
        #     return Response([], status=status.HTTP_400_BAD_REQUEST)
        #
        # data = {'name': request.data.get('name'), 'teacher': teacher}
        # serializer = ProjectSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # serializer.save()
        # headers = self.get_success_headers(serializer.data)
        # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

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
    permission_classes = [AllowAny]
    serializer_class = ProjectSerializer
    lookup_field = 'id'


class ProjectCreateView(generics.CreateAPIView):
    queryset = Project.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ProjectSerializer


class TaskView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    permission_classes = [AllowAny]
    serializer_class = TaskSerializer
    lookup_field = 'id'


class TaskCreateView(generics.CreateAPIView):
    queryset = Task.objects.all()
    permission_classes = [AllowAny]
    serializer_class = TaskSerializer


class TasksView(generics.ListAPIView):
    queryset = Task.objects.all()
    permission_classes = [AllowAny]
    serializer_class = TaskSerializer
