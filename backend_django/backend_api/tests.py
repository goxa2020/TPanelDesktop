from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Project, Task, Teacher, Student
from django.utils import timezone
from datetime import timedelta
import redis
from django.core.cache import cache

User = get_user_model()

class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            username='testuser',
            password='testpass123'
        )

    def test_user_creation(self):
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(self.user.username, 'testuser')
        self.assertTrue(self.user.check_password('testpass123'))

    def test_user_full_name(self):
        self.user.first_name = 'John'
        self.user.last_name = 'Doe'
        self.assertEqual(self.user.full_name, 'John Doe')

class ProjectModelTest(TestCase):
    def setUp(self):
        self.teacher = Teacher.objects.create_user(
            email='teacher@example.com',
            username='teacher',
            password='testpass123'
        )
        self.project = Project.objects.create(
            name='Test Project',
            teacher=self.teacher
        )

    def test_project_creation(self):
        self.assertEqual(self.project.name, 'Test Project')
        self.assertEqual(self.project.teacher, self.teacher)

class TaskModelTest(TestCase):
    def setUp(self):
        self.teacher = Teacher.objects.create_user(
            email='teacher@example.com',
            username='teacher',
            password='testpass123'
        )
        self.project = Project.objects.create(
            name='Test Project',
            teacher=self.teacher
        )
        self.task = Task.objects.create(
            name='Test Task',
            project=self.project,
            deadline=timezone.now().date() + timedelta(days=1)
        )

    def test_task_creation(self):
        self.assertEqual(self.task.name, 'Test Task')
        self.assertEqual(self.task.project, self.project)
        self.assertFalse(self.task.done)
        self.assertFalse(self.task.overdue)

    def test_task_overdue(self):
        self.task.deadline = timezone.now().date() - timedelta(days=1)
        self.task.save()
        self.assertTrue(self.task.overdue)

class RegisterViewTest(APITestCase):
    def setUp(self):
        self.url = reverse('auth_register')
        self.valid_data = {
            'email': 'newuser@example.com',
            'username': 'newuser',
            'password': 'newpass123',
            'password2': 'newpass123'
        }

    def test_register_user(self):
        response = self.client.post(self.url, self.valid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email='newuser@example.com').exists())

class ProjectsViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.teacher = Teacher.objects.create_user(
            email='teacher@example.com',
            username='teacher',
            password='testpass123'
        )
        self.student = Student.objects.create_user(
            email='student@example.com',
            username='student',
            password='testpass123'
        )
        self.project = Project.objects.create(
            name='Test Project',
            teacher=self.teacher
        )
        self.project.students.add(self.student)
        self.url = reverse('get_projects')

    def test_get_projects_authenticated(self):
        self.client.force_authenticate(user=self.teacher)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_projects_unauthenticated(self):
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class TasksViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.teacher = Teacher.objects.create_user(
            email='teacher@example.com',
            username='teacher',
            password='testpass123'
        )
        self.project = Project.objects.create(
            name='Test Project',
            teacher=self.teacher
        )
        self.task = Task.objects.create(
            name='Test Task',
            project=self.project
        )
        self.url = reverse('get_tasks')

    def test_get_tasks_authenticated(self):
        self.client.force_authenticate(user=self.teacher)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_tasks_by_project(self):
        self.client.force_authenticate(user=self.teacher)
        response = self.client.get(f'{self.url}?project_id={self.project.id}', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

class RedisConnectionTest(TestCase):
    def setUp(self):
        self.test_key = 'test_key'
        self.test_value = 'test_value'

    def test_redis_connection(self):
        """Проверка базового подключения к Redis"""
        try:
            r = redis.Redis(host='localhost', port=6379, db=1)
            r.ping()
            self.assertTrue(True, "Подключение к Redis успешно установлено")
        except redis.ConnectionError:
            self.fail("Ошибка подключения к Redis")

    def test_django_cache_set(self):
        """Проверка записи в кэш Django"""
        cache.set(self.test_key, self.test_value, timeout=60)
        cached_value = cache.get(self.test_key)
        self.assertEqual(cached_value, self.test_value, "Значение успешно записано в кэш")

    def test_django_cache_get(self):
        """Проверка чтения из кэша Django"""
        cache.set(self.test_key, self.test_value, timeout=60)
        cached_value = cache.get(self.test_key)
        self.assertEqual(cached_value, self.test_value, "Значение успешно прочитано из кэша")
