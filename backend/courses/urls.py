from django.urls import path
from .views import CourseAdvertiserView,CourseSearchView

urlpatterns = [
    path('advertisers/', CourseAdvertiserView.as_view(), name='course-advertisers'),
    path('search/', CourseSearchView.as_view(), name='course-search'),
]