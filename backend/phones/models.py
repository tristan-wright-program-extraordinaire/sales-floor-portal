from django.db import models

class Extension(models.Model):
    number = models.CharField(max_length=5, primary_key=True)
    did = models.CharField(max_length=20, blank=True)
    tenant = models.CharField(max_length=3, blank=False)

    def __str__(self):
        return self.number

class Call(models.Model):
    caller = models.CharField(max_length=20,blank=True)
    receiver = models.CharField(max_length=20,blank=True)
    timestamp = models.DateTimeField(blank=True, null=True)
    duration = models.CharField(max_length=10,blank=True)
    active_duration = models.CharField(max_length=10,blank=True)
    status = models.CharField(max_length=20,blank=True)
    outgoing = models.CharField(max_length=20,blank=True)
    call_id = models.CharField(max_length=20,blank=True)

    def __str__(self):
        return f'From {self.caller} To {self.receiver}: {self.call_id}'
    
