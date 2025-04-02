from .models import User, Project, Student, Teacher, Task

from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'full_name', 'birthday',
                  'verified', 'image', 'is_staff', 'is_student', 'is_teacher', 'role')
        # fields = '__all__'


class StudentSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = Student
        fields = UserSerializer.Meta.fields + ('student_group',)


class TeacherSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = Teacher
        fields = UserSerializer.Meta.fields + ('teacher_achievements',)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user: User):
        token = super().get_token(user)

        # Базовые поля пользователя
        token['full_name'] = user.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['image'] = str(user.image)
        token['birthday'] = str(user.birthday)
        token['verified'] = user.verified
        token['is_staff'] = user.is_staff
        token['is_student'] = user.is_student
        token['is_teacher'] = user.is_teacher

        # Оптимизированные запросы для дополнительных данных
        if user.is_student:
            student = Student.objects.get(id=user.id)
            token['student_group'] = student.student_group
        if user.is_teacher:
            teacher = Teacher.objects.get(id=user.id)
            token['teacher_achievements'] = teacher.teacher_achievements

        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Пароли не совпадают"}
            )

        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class TaskSerializer(serializers.ModelSerializer):
    project = serializers.SlugRelatedField(slug_field='id', queryset=Project.objects, read_only=False, allow_null=True)

    class Meta:
        model = Task
        fields = ('id', 'project', 'name', 'description', 'created', 'deadline', 'done')


class ProjectSerializer(serializers.ModelSerializer):
    teacher = serializers.SlugRelatedField(
        slug_field='id', 
        queryset=Teacher.objects
    )
    students = serializers.SlugRelatedField(
        slug_field='id', 
        queryset=Student.objects, 
        many=True
    )
    tasks = serializers.SlugRelatedField(
        slug_field='id', 
        queryset=Task.objects, 
        many=True
    )

    class Meta:
        model = Project
        fields = ('id', 'name', 'tasks', 'teacher', 'students')
