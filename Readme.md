# Sales Floor Portal

> A full-stack production platform for sales reps, managers, and admins to manage course inventory, sourcing, and lead generation. Hosted on Google Cloud Run.

<img width="1470" height="744" alt="Screenshot 2026-03-09 at 1 41 42 PM" src="https://github.com/user-attachments/assets/36888b3e-f43a-4d2b-b55b-9aa2c20c5fd0" />
<img width="1470" height="745" alt="Screenshot 2026-03-09 at 1 42 30 PM" src="https://github.com/user-attachments/assets/09f99b2f-0e3f-471b-b5d5-8638906ab597" />


---

## What This Is

Sales representatives need to know which golf courses are available to work with, what products those courses are signed up for, and where to find new leads in their territory. Before this platform, that information lived in disconnected spreadsheets and databases that were constantly out of sync.

The Sales Floor Portal centralizes everything. It pulls from two independent course databases, merges them automatically on a continuous basis, and presents a clean interface where reps can browse their inventory, filter by territory, and surface new leads. All in one place. Managers and admins get additional tooling for account management and oversight.

---

## Features

- **Role-based access** - Separate views and permissions for sales reps, managers, and admins
- **Course inventory** - Browse and filter the full catalog of signed courses with detailed info per course
- **Dual database merging** - Continuously reconciles two independent course data sources into a single unified dataset automatically
- **Lead sourcing tools** - Built-in tools to help reps find new courses in their area and start the sourcing process
- **User account management** - Admin interface for creating and managing rep and manager accounts

---

## Tech Stack

**Frontend**

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3&logoColor=white)

**Backend**

![Django](https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)

**Infrastructure**

![Google Cloud Run](https://img.shields.io/badge/Google_Cloud_Run-4285F4?style=flat-square&logo=googlecloud&logoColor=white)

---

## Architecture

The project follows a clean Django + React monorepo structure:

```
sales-floor-portal/
├── backend/        # Django REST API, data models, merge logic
└── frontend/       # React application
```

The backend exposes a REST API consumed by the React frontend. Django's `build_frontend` management command compiles the frontend into the backend's static files for production, resulting in a single deployable unit served by Django on Google Cloud Run.

The dual database merge runs automatically, reconciling differences between two upstream course data sources and keeping the portal's inventory current without manual intervention.
