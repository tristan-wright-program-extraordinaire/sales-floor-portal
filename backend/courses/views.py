from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models import Q
from courses.models import Course
from courses.serializers import CourseSerializer
import requests
import re

class CourseAdvertiserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        regex = r"standard-([a-z0-9-]+)-\d{8}-"
        request_url = f"https://api.digitalfairways.com/api/v1/ads?gcId={request.data.get('course')}"
        advertisers_response = requests.get(request_url)
        advertiser_names = []
        if advertisers_response.status_code == 200:
            print(len(advertisers_response.json()['data']))
            for advertiser in advertisers_response.json()['data']:
                matches = re.search(regex,advertiser['smallImage'], re.IGNORECASE)
                if matches:
                    advertiser = matches.group(1).replace("-"," ")
                    advertiser_names.append(advertiser)
        else:
            return Response({"error": "Bad Course Request."},
            status=status.HTTP_400_BAD_REQUEST)

        if len(advertiser_names) > 0:
            return Response({"advertisers": list(set(advertiser_names))})
        else:
            return Response({"error": "No Advertisers Found."},
            status=status.HTTP_400_BAD_REQUEST)
        

class CourseSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.GET.get('q', '')
        
        if not query:
            return Response([], status=status.HTTP_200_OK)
        
        courses = Course.objects.filter(
            Q(name__icontains=query) | 
            Q(city__icontains=query) | 
            Q(state__icontains=query) |
            Q(zip__icontains=query)
        )[:20]
        
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)