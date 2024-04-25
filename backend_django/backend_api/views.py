from .models import User, Project, Student
from .serializer import RegisterSerializer, MyTokenObtainPairSerializer, ProjectSerializer

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


@api_view(['GET', 'POST'])
def test_endpoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.data.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_projects(request):
    user_id = request.query_params.get('user_id')
    print('запрос на пользователя', user_id)
    user: User = User.objects.filter(id=user_id).first()
    print('Пользователь:', user)
    if user:
        print('такой существует')
        if user.is_student:
            print('он студент')
            projects = Project.objects.filter(students=user).all()
            serialised_projects = [ProjectSerializer(project).data for project in projects]

            return Response(serialised_projects, status.HTTP_200_OK)
        elif user.is_teacher:
            print("он препод")
            projects = Project.objects.filter(teacher=user).all()
            serialised_projects = [ProjectSerializer(project).data for project in projects]

            return Response(serialised_projects, status.HTTP_200_OK)
    return Response({}, status.HTTP_404_NOT_FOUND)
