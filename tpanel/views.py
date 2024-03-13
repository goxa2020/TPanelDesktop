from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.db import transaction
from .forms import UserForm, ProfileForm


def main(request):

    return render(request, 'tpanel/main.html')


@login_required
def mail(request):
    return render(request, 'tpanel/mail.html', {'title': 'почта'})


@login_required
def tasks(request):
    return render(request, 'tpanel/tasks.html', {'title': 'задания'})


@login_required
def notifications(request):
    return render(request, 'tpanel/notifications.html', {'title': 'уведомления'})


def not_found(request, page):
    return render(request, 'tpanel/not_found.html', {'page': page, 'title': '404, не найдено'})


@login_required
@transaction.atomic
def profile(request):
    if request.method == 'POST':
        user_form = UserForm(request.POST, instance=request.user)
        profile_form = ProfileForm(request.POST, instance=request.user.profile)
        print('проверка')
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            print('валид')
            return redirect('/profile')
        else:
            print('невалид')
    else:
        user_form = UserForm(instance=request.user)
        profile_form = ProfileForm(instance=request.user.profile)
    return render(request, 'registration/profile.html', {
        'user_form': user_form,
        'profile_form': profile_form
    })
