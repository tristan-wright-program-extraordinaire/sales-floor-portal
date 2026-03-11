import os
import shutil
import subprocess

from django.core.management.base import BaseCommand
from django.conf import settings


class Command(BaseCommand):
    help = "Builds the React frontend and copies it into the Django static and templates directories"

    def handle(self, *args, **options):
        BASE_DIR = settings.BASE_DIR
        FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
        BUILD_DIR = os.path.join(FRONTEND_DIR, "build")
        DJANGO_STATIC_DIR = os.path.join(BASE_DIR, "backend", "static")
        DJANGO_TEMPLATES_DIR = os.path.join(BASE_DIR, "backend", "templates")

        # 1. Run npm build
        self.stdout.write("Building React frontend...")
        try:
            subprocess.run(["npm", "run", "build"], cwd=FRONTEND_DIR, check=True)
            self.stdout.write(self.style.SUCCESS("React build completed."))
        except subprocess.CalledProcessError:
            self.stderr.write(self.style.ERROR("React build failed."))
            return

        # 2. Clear old static/template files
        self.stdout.write("Cleaning up old build files...")

        if os.path.exists(DJANGO_STATIC_DIR):
            shutil.rmtree(DJANGO_STATIC_DIR)
        if os.path.exists(DJANGO_TEMPLATES_DIR):
            shutil.rmtree(DJANGO_TEMPLATES_DIR)

        os.makedirs(DJANGO_STATIC_DIR)
        os.makedirs(DJANGO_TEMPLATES_DIR)

        self.stdout.write(self.style.SUCCESS("Old files removed."))

        # 3. Copy new build files
        self.stdout.write("Copying new build files into Django...")

        # Static files (js, css, media)
        static_src = os.path.join(BUILD_DIR, "static")
        shutil.copytree(static_src, DJANGO_STATIC_DIR, dirs_exist_ok=True)

        # HTML (index.html for root template)
        index_html = os.path.join(BUILD_DIR, "index.html")
        shutil.copy2(index_html, os.path.join(DJANGO_TEMPLATES_DIR, "index.html"))

        self.stdout.write(self.style.SUCCESS("React build integrated into Django."))
