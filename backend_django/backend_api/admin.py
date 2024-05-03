from django.contrib import admin
from .models import User, Project, Teacher, Student, Task


class UserAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['id', 'username', 'full_name', 'email', 'verified']


class ProjectAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'teacher']


class TaskAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'project']


admin.site.register(User, UserAdmin)
admin.site.register(Teacher, UserAdmin)
admin.site.register(Student, UserAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Task, TaskAdmin)
