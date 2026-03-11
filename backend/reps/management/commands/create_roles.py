# accounts/management/commands/create_roles.py
from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from reps.models import Rep
from courses.models import Course

class Command(BaseCommand):
    help = 'Create role groups and attach permissions'

    def handle(self, *args, **kwargs):
        # Get the content type for Rep
        rep_ct = ContentType.objects.get_for_model(Rep)
        course_ct = ContentType.objects.get_for_model(Course)

        # Get permissions for Rep
        view_rep = Permission.objects.get(codename='view_rep', content_type=rep_ct)
        change_role = Permission.objects.get(codename='change_role', content_type=rep_ct)
        modify_rep = Permission.objects.get(codename='modify_rep', content_type=rep_ct)
        assign_course = Permission.objects.get(codename='assign_course', content_type=rep_ct)
        create_course = Permission.objects.get(codename='create_course',content_type=course_ct)

        # Create or get groups
        manager_group, _ = Group.objects.get_or_create(name='Manager')
        rep_group, _ = Group.objects.get_or_create(name='Rep')
        admin_group, _ = Group.objects.get_or_create(name='Admin')
        super_group, _ = Group.objects.get_or_create(name='Super_Admin')

        # Assign permissions to groups
        rep_group.permissions.set([view_rep])
        
        manager_group.permissions.set([view_rep, modify_rep,assign_course])

        admin_group.permissions.set([view_rep, modify_rep,assign_course,change_role,update_course,create_course,delete_course])

        super_group.permissions.set(["all"])

        self.stdout.write(self.style.SUCCESS('Roles and permissions created.'))
