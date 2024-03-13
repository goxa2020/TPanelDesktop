from django.http import JsonResponse
from django.shortcuts import render
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

    user_form = UserForm(instance=request.user)
    profile_form = ProfileForm(instance=request.user.profile)

    if request.method == 'POST':
        user_form = UserForm(request.POST, instance=request.user)
        profile_form = ProfileForm(request.POST, instance=request.user.profile)
        if user_form.is_valid() and profile_form.is_valid():
            name = user_form.cleaned_data.get('first_name')
            user_form.save()
            profile_form.save()
            return JsonResponse({"name": name}, status=200)

        else:
            user_errors = user_form.errors.as_json()
            profile_errors = profile_form.errors.as_json()
            return JsonResponse({"errors": user_errors+profile_errors}, status=400)

    return render(request, 'registration/profile.html', {
        'title': 'профиль',
        'user_form': user_form,
        'profile_form': profile_form
    })
