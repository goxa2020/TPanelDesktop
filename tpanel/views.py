from django.shortcuts import render
from django.template.loader import render_to_string
# from django.http import HttpResponse, Http404


def main(request):

    return render(request, 'tpanel/main.html')


def mail(request):
    return render(request, 'tpanel/mail.html', {'title': 'почта'})


def not_found(request, page):
    return render(request, 'tpanel/not_found.html', {'page': page})
