from django.contrib.auth.models import AbstractUser,UserManager
from django.db import models
from phones.models import Extension
from courses.models import Course

class RepManager(UserManager):
    def create_rep(self, extension_number, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        if not extension_number:
            raise ValueError('The Extension Number must be set')
        
        try:
            extension_obj = Extension.objects.get(number=extension_number)
        except Extension.DoesNotExist:
            raise ValueError('This Extension Doesn\'t exist')

        user = self.model(
            extension_number=extension_number,
            extension=extension_obj,
            **extra_fields
        )
        user.set_password('*****PROPRIETARY INFO *****')
        user.save(using=self._db)
        return user
    
    def create_manager(self, extension_number, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', False)

        if not extension_number:
            raise ValueError('The Extension Number must be set')
        elif not password:
            raise ValueError('The Password must be set')
        
        try:
            extension_obj = Extension.objects.get(number=extension_number)
        except Extension.DoesNotExist:
            raise ValueError('This Extension Doesn\'t exist')

        user = self.model(
            extension_number=extension_number,
            extension=extension_obj,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, extension_number, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if not extension_number:
            raise ValueError('The Extension Number must be set')
        return self.create_user(extension_number, password, **extra_fields)

class Rep(AbstractUser):
    username = None
    objects = RepManager()
    class Meta:
        permissions = [
            ("change_extension", "Can change extension"),
            ("change_role", "Can change role"),
            ("modify_rep", "Can change rep info"),
        ]

    ROLE_CHOICES = (
        ('rep', 'Rep'),
        ('manager', 'Manager'),
        ('admin', 'Admin'),
        ('superadmin', 'Super-Admin'),
    )

    role = models.CharField(max_length=20,
                            choices=ROLE_CHOICES,
                            default='rep')
    
    name = models.CharField(max_length=20,default="Test", blank=False)
    office = models.CharField(max_length=20,default="Tempe", blank=False)
    
    extension_number = models.CharField(
        max_length=5,
        unique=True,
        null=False,
        blank=False,
        help_text="Extension number used as username"
    )

    extension = models.ForeignKey(
        Extension,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='reps'
    )

    USERNAME_FIELD = 'extension_number'
    REQUIRED_FIELDS = ['role']

    def __str__(self):
        return f'{self.extension_number} ({self.role})'

    
class CourseAssignment(models.Model):
    rep = models.ForeignKey(
        Rep,
        on_delete=models.CASCADE,
        related_name='course_assignments'
    )

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='rep_assignments'
    )

    active = models.BooleanField(default=True)
    assigned_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.rep} assigned to {self.course}"
    
class RepAssignment(models.Model):
    manager = models.ForeignKey(
        Rep,
        on_delete=models.CASCADE,
        related_name='rep_assignments'
    )

    rep = models.ForeignKey(
        Rep,
        on_delete=models.CASCADE,
        related_name='manager_assignments'
    )

    active = models.BooleanField(default=True)
    assigned_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.rep} assigned to {self.manager}"