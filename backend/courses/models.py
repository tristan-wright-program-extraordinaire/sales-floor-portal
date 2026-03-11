from django.db import models

class Course(models.Model):
    class Meta:
        permissions = [
            ("create_course", "Can create a new course entry"),
        ]
    name = models.CharField(max_length=100, blank=False)
    timezone = models.CharField(max_length=20, blank=True)
    city = models.CharField(max_length=20, blank=True)
    state = models.CharField(max_length=20, blank=True)
    zip = models.IntegerField(blank=False, default="00000")
    company = models.CharField(max_length=10, blank=False, default="Digital")
    course_id = models.IntegerField(blank=False, default=0)

    def __str__(self):
        return self.name