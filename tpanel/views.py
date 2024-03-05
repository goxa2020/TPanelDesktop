from django.shortcuts import render
from django.template.loader import render_to_string
from django.contrib.auth.decorators import login_required
# from django.http import HttpResponse, Http404


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


def login(request):
    # if user:
    #     redirect()
    return render(request, 'tpanel/templates/registration/login.html', {'title': 'авторизация'})


def not_found(request, page):
    return render(request, 'tpanel/not_found.html', {'page': page})
