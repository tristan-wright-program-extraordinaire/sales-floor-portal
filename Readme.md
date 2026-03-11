# Django and React Framework

##  Quick Start

### 1. Clone the repository & set up virtual environment

#### Clone The Repository

```bash
git clone https://github.com/DF-Tristan-IT/Django-React-BoilerPlate.git
```

#### Setup the Directory

> Copy the everything from the new folder into the root folder, but leave out the .git file.

#### Create the Virtual Environment

```bash
python -m venv .venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

### 2. Install Django Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Install React dependencies

```bash
cd ../frontend
npm install
```

## Starting Up Development

In the backend directory, you can run:

```bash
python manage.py runserver
```

This starts up the django server. You can test it [here](http://127.0.0.1:8000) (unless you have it somewhere else).

Then, in the frontend directory, you can run:

```bash
npm start
```

This should pull up a browser [here](localhost:3000). This is just for development.

## Build the Project

In order to build the project in the backend directory, you can run:

```bash
python manage.py build_frontend
```

Then, you can run the server like normal:

```bash
python manage.py runserver
```
