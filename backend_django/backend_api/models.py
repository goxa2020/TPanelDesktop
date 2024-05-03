from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    image = models.ImageField(upload_to="user_images", default=False)
    birthday = models.DateField(blank=True, null=True)

    verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = _("пользователь")
        verbose_name_plural = _("пользователи")

    @property
    def full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        return f'{self.first_name} {self.last_name}'

    @property
    def is_student(self):
        return bool(Student.objects.filter(id=self.id).first())

    @property
    def is_teacher(self):
        return bool(Teacher.objects.filter(id=self.id).first())

    def __str__(self) -> str:
        return self.full_name


class Student(User):
    student_group = models.CharField(max_length=15, blank=True, null=True)

    class Meta:
        verbose_name = _("ученик")
        verbose_name_plural = _("ученики")


class Teacher(User):
    teacher_achievements = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        verbose_name = _("учитель")
        verbose_name_plural = _("учителя")


class Project(models.Model):
    name = models.CharField(max_length=150)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='projects')
    students = models.ManyToManyField(Student, related_name='projects', null=True, blank=True)

    class Meta:
        verbose_name = _("проект")
        verbose_name_plural = _("проекты")

    def __str__(self):
        return f'{self.id}: {self.name}'


class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks', null=True, blank=True)
    name = models.CharField(max_length=150, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created = models.DateField(auto_now_add=True)
    deadline = models.DateField(blank=True, null=True)
    done = models.BooleanField(default=False)

    class Meta:
        verbose_name = _("Задача")
        verbose_name_plural = _("Задачи")

    def __str__(self):
        return f'{self.id}: {self.name}'
