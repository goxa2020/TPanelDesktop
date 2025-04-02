from .models import User, Project, Task
from .serializers import RegisterSerializer, ProjectSerializer, TaskSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from django.core.cache import cache
from rest_framework.pagination import PageNumberPagination
from .cache import cache_view, invalidate_cache


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
    """
    Возвращает список всех доступных API маршрутов.
    """
    # Импорты
    from django.urls import get_resolver
    import re

    routes = cache.get('api_routes')
    
    if routes:
        return Response(routes)

    # Получаем все URL паттерны
    url_patterns = get_resolver().url_patterns
    routes = set()  # Используем множество для уникальных значений

    def get_pattern_urls(pattern, base_path=''):
        """Рекурсивно собирает все API маршруты."""
        if hasattr(pattern, 'pattern'):
            path = str(pattern.pattern)
            
            # Формируем полный путь
            if base_path:
                path = f'{base_path.rstrip("/")}/{path.lstrip("/")}'
                
            # Добавляем только API маршруты
            if path.startswith('api/'):
                # Нормализуем путь
                normalized_path = re.sub(r'//+', '/', path)
                routes.add(normalized_path)
            
        # Рекурсивно обрабатываем вложенные паттерны
        if hasattr(pattern, 'url_patterns'):
            for p in pattern.url_patterns:
                get_pattern_urls(p, base_path=str(pattern.pattern))

    # Собираем маршруты
    for pattern in url_patterns:
        get_pattern_urls(pattern)

    # Преобразуем в список и сортируем
    sorted_routes = sorted(list(routes))
    cache.set('api_routes', sorted_routes, timeout=3600)  # кэшируем на 1 час
    return Response(sorted_routes)


class ProjectsView(generics.ListAPIView):
    queryset = Project.objects.select_related('teacher').prefetch_related('students')
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSerializer

    @cache_view(timeout=60 * 5)  # 5 минут
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

        user = User.objects.filter(id=user_id).first()

        if not user:
            return Project.objects.none()

        if user.is_student:
            return queryset.filter(students=user)

        if user.is_teacher:
            return queryset.filter(teacher=user)

        return queryset


class ProjectView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.select_related('teacher').prefetch_related('students')
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSerializer
    lookup_field = 'id'

    def perform_update(self, serializer):
        instance = serializer.save()
        invalidate_cache('ProjectsView:*')
        return instance

    def perform_destroy(self, instance):
        instance.delete()
        invalidate_cache('ProjectsView:*')


class ProjectCreateView(generics.CreateAPIView):
    queryset = Project.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSerializer


class TaskView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.select_related('project', 'project__teacher').prefetch_related('project__students')
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer
    lookup_field = 'id'

    def perform_update(self, serializer):
        instance = serializer.save()
        invalidate_cache('TasksView:*')
        return instance

    def perform_destroy(self, instance):
        instance.delete()
        invalidate_cache('TasksView:*')


class TaskCreateView(generics.CreateAPIView):
    queryset = Task.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer


class TasksView(generics.ListAPIView):
    queryset = Task.objects.select_related('project', 'project__teacher').prefetch_related('project__students')
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer
    pagination_class = PageNumberPagination

    @cache_view(timeout=60 * 5)  # 5 минут
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        queryset = super().get_queryset()
        project_id = self.request.query_params.get('project_id')
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        return queryset
