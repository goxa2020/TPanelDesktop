from django.contrib import admin
from .models import User, Task, Teacher, Student


class UserAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['username', 'full_name', 'email', 'verified']


admin.site.register(User, UserAdmin)
admin.site.register(Task)
admin.site.register(Teacher, UserAdmin)
admin.site.register(Student, UserAdmin)
