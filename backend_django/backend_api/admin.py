from django.contrib import admin
from .models import User, Project, Teacher, Student, Task


class UserAdmin(admin.ModelAdmin):
    search_fields = ['username', 'email', 'full_name']
    list_filter = ['verified']
    list_editable = ['verified']
    list_display = ['id', 'username', 'full_name', 'email', 'verified']
    list_display_links = ['id', 'username', 'full_name']


class ProjectAdmin(admin.ModelAdmin):
    search_fields = ['name', 'teacher__username']
    list_display = ['id', 'name', 'teacher']
    list_display_links = ['id', 'name']


class TaskAdmin(admin.ModelAdmin):
    search_fields = ['name', 'project__name']
    list_filter = ['done', 'overdue']
    list_display = ['id', 'name', 'project', 'done', 'overdue']
    list_display_links = ['id', 'name']

admin.site.register(User, UserAdmin)
admin.site.register(Teacher, UserAdmin)
admin.site.register(Student, UserAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Task, TaskAdmin)
