from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
from django.utils import timezone

class User(AbstractUser):
    username = models.CharField(
        max_length=100,
        help_text=_("Имя пользователя для отображения в системе")
    )
    email = models.EmailField(
        unique=True,
        db_index=True,
        help_text=_("Email пользователя, используется для входа")
    )
    image = models.ImageField(
        upload_to="media/user_images",
        default=False,
        help_text=_("Фотография профиля пользователя")
    )
    birthday = models.DateField(
        blank=True,
        null=True,
        help_text=_("Дата рождения пользователя")
    )
    verified = models.BooleanField(
        default=False,
        help_text=_("Статус верификации пользователя")
    )

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

    @property
    def role(self):
        role = 'teacher' if self.is_teacher else ('student' if self.is_student else None)
        print(role)
        return role

    def __str__(self) -> str:
        return self.full_name


class Student(User):
    student_group = models.CharField(max_length=15, blank=True, null=True)

    class Meta:
        verbose_name = _("ученик")
        verbose_name_plural = _("ученики")


class Teacher(User):
    teacher_achievements = models.CharField(
        max_length=150,
        blank=True,
        null=True,
        help_text=_("Достижения и награды учителя")
    )

    class Meta:
        verbose_name = _("учитель")
        verbose_name_plural = _("учителя")


class Project(models.Model):
    name = models.CharField(
        max_length=150,
        help_text=_("Название проекта")
    )
    teacher = models.ForeignKey(
        Teacher,
        on_delete=models.CASCADE,
        related_name='projects',
        db_index=True,
        help_text=_("Учитель, ведущий проект")
    )
    students = models.ManyToManyField(
        Student,
        related_name='projects',
        blank=True,
        help_text=_("Ученики, участвующие в проекте")
    )

    class Meta:
        verbose_name = _("проект")
        verbose_name_plural = _("проекты")

    def __str__(self):
        return f'{self.id}: {self.name}'


class Task(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='tasks',
        null=True,
        blank=True,
        db_index=True,
        help_text=_("Проект, к которому относится задача")
    )
    name = models.CharField(
        max_length=150,
        blank=True,
        null=True,
        help_text=_("Название задачи")
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text=_("Описание задачи")
    )
    deadline = models.DateField(
        blank=True,
        null=True,
        help_text=_("Крайний срок выполнения задачи")
    )
    done = models.BooleanField(
        default=False,
        help_text=_("Статус выполнения задачи")
    )
    overdue = models.BooleanField(
        default=False,
        help_text=_("Задача просрочена")
    )

    class Meta:
        verbose_name = _("Задача")
        verbose_name_plural = _("Задачи")

    def clean(self):
        # При создании нельзя установить дедлайн в прошлом
        if not self.pk and self.deadline and self.deadline < timezone.now().date():
            raise ValidationError(_("Дедлайн не может быть раньше текущей даты"))
        super().clean()

    def save(self, *args, **kwargs):
        self.full_clean()
        
        # Обновляем статус просрочки
        if self.deadline and self.deadline < timezone.now().date() and not self.done:
            self.overdue = True
        
        # Если задача выполнена, снимаем просрочку
        if self.done:
            self.overdue = False
            
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.id}: {self.name}'
