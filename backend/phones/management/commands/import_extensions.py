from django.core.management.base import BaseCommand
from phones.models import Extension
import csv

class Command(BaseCommand):
    help = 'Import extensions from a CSV file (no headers)'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file')
        parser.add_argument('tenant', type=str, help='The tenant of these files')

    def handle(self, *args, **options):
        csv_file = options['csv_file']
        tenant = options['tenant']
        with open(csv_file, newline='') as f:
            reader = csv.reader(f)
            count = 0
            for row in reader:
                if len(row) > 4 and row[3] == "Extension" and row[4]:
                    if not Extension.objects.filter(number=row[4]).exists():
                        Extension.objects.create(
                            number=row[4],
                            did=row[1],
                            tenant=tenant
                        )
                        count += 1
        self.stdout.write(self.style.SUCCESS(f'Imported {count} extensions successfully.'))