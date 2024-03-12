from django import template
from django.contrib.auth.models import User

register = template.Library()


@register.filter(name='is_student')
def is_student(user: User):
    return user.profile.is_student


@register.filter(name='is_teacher')
def is_teacher(user: User):
    return user.profile.is_teacher
