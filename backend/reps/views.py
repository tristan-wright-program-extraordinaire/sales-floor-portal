from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Rep, CourseAssignment, RepAssignment
from .serializers import RepSerializer, CourseAssignmentSerializer

class RepMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        rep = request.user
        serializer = RepSerializer(rep)
        return Response(serializer.data)
    
class RepActiveCoursesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, rep_id):
        assignments = CourseAssignment.objects.filter(rep_id=rep_id,active=True)
        serializer = CourseAssignmentSerializer(assignments, many=True)
        return Response(serializer.data)
    
class ManagerActiveRepsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, rep_id):
        assignments = RepAssignment.objects.filter(manager_id=rep_id,active=True)
        reps = [assignment.rep for assignment in assignments]
        serializer = RepSerializer(reps, many=True)
        return Response(serializer.data)