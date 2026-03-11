from rest_framework import serializers
from .models import Rep, CourseAssignment
from courses.models import Course
from phones.models import Extension

class ExtensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Extension
        fields = '__all__'

class RepSerializer(serializers.ModelSerializer):
    extension = ExtensionSerializer(read_only=True)

    class Meta:
        model = Rep
        fields = ['role','name','office','id','extension']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class CourseAssignmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)

    class Meta:
        model = CourseAssignment
        fields = '__all__'