from django.urls import path
from .views import RepMeView,RepActiveCoursesView,ManagerActiveRepsView

urlpatterns = [
    path('me/', RepMeView.as_view(), name='rep-me'),
    path('rep/<int:rep_id>/active-assignments/',RepActiveCoursesView.as_view(),name='rep-active-assignments'),
    path('manager/<int:rep_id>/active-assignments/',ManagerActiveRepsView.as_view(),name='manager-active-assignments')
]