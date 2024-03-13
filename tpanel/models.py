from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_teacher = models.BooleanField(blank=True, null=True)
    is_student = models.BooleanField(blank=True, null=True)
    student_group = models.CharField(max_length=15, blank=True, null=True)
    birthday = models.DateField(verbose_name='Дата вашего рождения:', blank=True, null=True)


# при создании user, создаётся и profile
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


# при сохранении user, сохраняется и profile
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
