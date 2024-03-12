from django import forms
from django.contrib.auth.models import User
from django.forms import SelectDateWidget

from .models import Profile


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')


class ProfileForm(forms.ModelForm):
    # birthday = forms.DateField(input_formats=settings.DATE_INPUT_FORMATS,
    #                            widget=SelectDateWidget(years=list(range(1900, 2024))),
    #                            required=False
    #                            )

    class Meta:
        model = Profile
        fields = ['is_teacher', 'is_student', 'student_group', 'birthday']
        required = {
            'student_group': False,
            'birthday': False
        }
        widgets = {
            "birthday": SelectDateWidget(years=list(range(1900, 2024)), )
        }
