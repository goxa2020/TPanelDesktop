from .models import User, Task, Student, Teacher

from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'full_name', 'birthday',
                  'verified', 'image', 'is_staff', 'is_student', 'is_teacher')


class StudentSerializer(UserSerializer):
    class Meta:
        model = Student
        fields = ('id', 'username', 'email', 'full_name', 'birthday',
                  'verified', 'image', 'is_staff', 'is_student', 'is_teacher', 'student_group')


class TeacherSerializer(UserSerializer):
    class Meta:
        model = Teacher
        fields = ('id', 'username', 'email', 'full_name', 'birthday',
                  'verified', 'image', 'is_staff', 'is_student', 'is_teacher', 'teacher_achievements')



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user: User):
        token = super().get_token(user)

        # These are claims, you can add custom claims
        token['full_name'] = user.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['image'] = str(user.image)
        token['birthday'] = str(user.birthday)
        token['verified'] = user.verified
        token['is_staff'] = user.is_staff
        # ...
        token['is_student'] = user.is_student
        token['is_teacher'] = user.is_teacher
        if user.is_student:
            token['student_group'] = Student.objects.filter(id=user.id).first().student_group
        if user.is_teacher:
            token['teacher_achievements'] = Teacher.objects.filter(id=user.id).first().teacher_achievements

        print(user.is_teacher, user.is_student)

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
                {"password": "Password fields didn't match."}
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
    teacher = TeacherSerializer(read_only=True)
    students = StudentSerializer(read_only=True, many=True)

    class Meta:
        model = Task
        fields = ('id', 'name', 'teacher', 'students')
