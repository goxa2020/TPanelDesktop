from django.shortcuts import render
from django.template.loader import render_to_string
from django.http import HttpResponse, Http404


def main(request):
    print(render_to_string('tpanel/main.html'))
    if request.GET.get('not_reload'):
        print("не был обновы")
        return render(request, 'tpanel/main.html')
    print("был обновы")
    return render(request, 'tpanel/base.html', {'content': render_to_string('tpanel/main.html')})


def mail(request):
    if request.GET.get('not_reload'):
        print("не был обновы")
        return render(request, 'tpanel/mail.html')
    print("был обновы")
    return render(request, 'tpanel/base.html', {'content': render_to_string('tpanel/mail.html')})


def not_found(request, page):
    return render(request, 'tpanel/not_found.html', {'page': page})
