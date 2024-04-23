from django.db import models
from django.contrib.auth.models import AbstractUser
# from django.db.models.signals import post_save
# from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    # is_student = False
    # is_teacher = False
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    # full_name = models.CharField(max_length=300)
    image = models.ImageField(upload_to="user_images", default="default")
    birthday = models.DateField(blank=True, null=True)

    # is_teacher = models.BooleanField(blank=True, default=False)
    # is_student = models.BooleanField(blank=True, default=False)
    # student_group = models.CharField(max_length=15, blank=True, null=True)
    # teacher_achievements = models.CharField(max_length=150, blank=True, null=True)

    verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    @property
    def full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        return f'{self.first_name} {self.last_name}'

    @property
    def is_student(self):
        return bool(Student.objects.filter(id=self.id))

    @property
    def is_teacher(self):
        return bool(Teacher.objects.filter(id=self.id))

    def __str__(self) -> str:
        return self.full_name


class Student(User):
    student_group = models.CharField(max_length=15, blank=True, null=True)

    class Meta:
        verbose_name = _("student")
        verbose_name_plural = _("students")


class Teacher(User):
    teacher_achievements = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        verbose_name = _("teacher")
        verbose_name_plural = _("teachers")


class Task(models.Model):
    name = models.CharField(max_length=150, blank=True, null=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='tasks')
    students = models.ManyToManyField(Student)

    class Meta:
        verbose_name = _("task")
        verbose_name_plural = _("tasks")

# class Profile(models.Model):
#
#
#     def __str__(self) -> str:
#         return self.full_name


# # при создании user, создаётся и profile
# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)
#
#
# # при сохранении user, сохраняется и profile
# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()
