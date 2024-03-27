from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver


class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


    def __str__(self) -> str:
        return self.username


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=300)
    image = models.ImageField(upload_to="user_images", default="default.jpg")
    is_teacher = models.BooleanField(blank=True, null=True)
    is_student = models.BooleanField(blank=True, null=True)
    student_group = models.CharField(max_length=15, blank=True, null=True)
    birthday = models.DateField(verbose_name='Дата вашего рождения:', blank=True, null=True)
    verified = models.BooleanField(default=False)
    
    def __str__(self) -> str:
        return self.full_name


# при создании user, создаётся и profile
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


# при сохранении user, сохраняется и profile
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()