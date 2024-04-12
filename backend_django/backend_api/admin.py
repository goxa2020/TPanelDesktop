from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['username', 'full_name', 'email', 'verified']


admin.site.register(User, UserAdmin)
