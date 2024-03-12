from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_teacher = models.BooleanField(null=True)
    is_student = models.BooleanField(null=True)
    student_group = models.CharField(max_length=15, null=True)
    birthday = models.DateField(verbose_name='Дата вашего рождения:', null=True)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
