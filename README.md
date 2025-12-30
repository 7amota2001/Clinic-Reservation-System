# Clinic Reservation System

A full-stack web application for managing clinic appointments and reservations. This system allows patients to book appointments with doctors and enables doctors to manage their schedules.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [License](#license)

## ✨ Features

### For Patients
- **User Registration & Authentication**: Sign up and sign in with JWT-based authentication
- **View Available Doctors**: Browse list of registered doctors
- **Book Appointments**: View available time slots and book appointments with doctors
- **Manage Appointments**: View, update, and cancel existing appointments
- **Appointment History**: Track all booked appointments

### For Doctors
- **Doctor Registration**: Register as a healthcare provider
- **Schedule Management**: Add available time slots for appointments
- **View Bookings**: See all booked appointments with patient details

## 🛠 Technology Stack

### Backend
- **Django 4.2.7**: Python web framework
- **Django REST Framework**: API development
- **MongoDB**: NoSQL database for data storage
- **PyMongo**: MongoDB driver for Python
- **JWT Authentication**: Secure token-based authentication
- **CORS Headers**: Cross-origin resource sharing support

### Frontend
- **Angular 16.2**: TypeScript-based frontend framework
- **RxJS**: Reactive programming library
- **Angular Router**: Client-side routing
- **TypeScript 5.1**: Typed JavaScript

### Database
- **MongoDB**: Document-based NoSQL database
- **Collections**:
  - `patients`: Patient user data
  - `doctors`: Doctor user data
  - `doctor_schedule`: Doctor availability slots
  - `patient_schedule`: Patient appointment bookings

## 📁 Project Structure

```
Clinic-Reservation-System/
├── backend/
│   └── toolsproject/
│       ├── myapp/              # Main Django application
│       │   ├── models.py       # Database models
│       │   ├── views.py        # API endpoints
│       │   ├── urls.py         # URL routing
│       │   ├── utils.py        # Utility functions
│       │   └── jwt_util.py     # JWT token management
│       ├── toolsproject/       # Project settings
│       │   ├── settings.py     # Django configuration
│       │   ├── urls.py         # Main URL configuration
│       │   └── wsgi.py         # WSGI configuration
│       └── manage.py           # Django management script
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── sign-in/        # Sign-in component
│   │       ├── sign-up/        # Sign-up component
│   │       ├── doctor-schedule/# Doctor schedule management
│   │       ├── patient-actions/# Patient appointment actions
│   │       └── services/       # Angular services
│   ├── angular.json            # Angular configuration
│   └── package.json            # Node.js dependencies
└── Database/
    └── Dockerfile              # MongoDB Docker configuration
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+**
- **Node.js 16+** and **npm**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Angular CLI**: `npm install -g @angular/cli`

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/7amota2001/Clinic-Reservation-System.git
cd Clinic-Reservation-System
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend/toolsproject

# Create a virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install django djangorestframework pymongo djongo django-cors-headers pyjwt
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install
```

### 4. Database Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally
# Follow instructions at: https://docs.mongodb.com/manual/installation/

# Start MongoDB service
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the connection string in `backend/toolsproject/myapp/views.py` and `backend/toolsproject/db_connection.py`

#### Option C: Docker
```bash
# Navigate to Database directory
cd Database

# Build and run MongoDB container
docker build -t clinic-mongodb .
docker run -d -p 27017:27017 clinic-mongodb
```

## ⚙️ Configuration

### Backend Configuration

1. **Update MongoDB Connection**

   Edit `backend/toolsproject/myapp/views.py` (line 52):
   ```python
   # For local MongoDB:
   client = MongoClient('mongodb://localhost:27017/')
   
   # For MongoDB Atlas:
   # client = MongoClient('mongodb+srv://username:password@cluster.mongodb.net/')
   ```

2. **Update Database Connection**

   Edit `backend/toolsproject/db_connection.py` (line 7):
   ```python
   my_client = pymongo.MongoClient("mongodb://localhost:27017/")
   ```

3. **Django Settings**

   The `backend/toolsproject/toolsproject/settings.py` file contains important configurations:
   - `SECRET_KEY`: Change this in production
   - `DEBUG`: Set to `False` in production
   - `ALLOWED_HOSTS`: Add your domain in production
   - `CORS_ALLOWED_ORIGINS`: Update with your frontend URL

### Frontend Configuration

1. **API Endpoint Configuration**

   Update the API base URL in your Angular services if needed (typically in `frontend/src/app/services/`).

## 🏃 Running the Application

### Start the Backend

```bash
cd backend/toolsproject

# Run database migrations
python manage.py makemigrations
python manage.py migrate

# Start the Django development server
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### Start the Frontend

```bash
cd frontend

# Start the Angular development server
ng serve
```

The frontend application will be available at `http://localhost:4200`

## 🔌 API Endpoints

### Authentication
- `POST /sign_up_view/` - Register a new user (patient or doctor)
- `POST /sign_in/` - Sign in and receive JWT token

### Doctor Endpoints
- `POST /insert_slot/` - Add available time slot (requires authentication)
- `GET /select_doctor/` - Get list of all doctors

### Patient Endpoints
- `GET /show_slots/<doctor_name>` - Get available slots for a specific doctor
- `POST /choose_slot/` - Book an appointment (requires authentication)
- `GET /patient_slots/` - Get patient's booked appointments (requires authentication)
- `PUT /update_appointment/` - Update an existing appointment (requires authentication)
- `DELETE /cancel_appointment/?cancelSlot=<slot_id>` - Cancel an appointment (requires authentication)

### Authentication Header

For protected endpoints, include the JWT token in the request header:
```
Authorization: Bearer <your_jwt_token>
```

## 📖 Usage

### For Patients

1. **Sign Up**: Create a new account as a patient
2. **Sign In**: Log in with your credentials
3. **Browse Doctors**: View the list of available doctors
4. **View Slots**: Check available time slots for your chosen doctor
5. **Book Appointment**: Select and book a time slot
6. **Manage Appointments**: View, update, or cancel your appointments

### For Doctors

1. **Sign Up**: Create a new account as a doctor (set `isDoctor: true`)
2. **Sign In**: Log in with your credentials
3. **Add Slots**: Create available time slots in your schedule
4. **View Bookings**: See appointments booked by patients

## 🔐 Security Notes

- The application uses JWT tokens for authentication
- **Important**: Change the `SECRET_KEY` in Django settings before deploying to production
- Update the JWT secret key in `myapp/views.py` (currently hardcoded as '7amotaelota')
- Set `DEBUG = False` in production
- Use environment variables for sensitive data like database credentials

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is available for educational and personal use.

## 👨‍💻 Author

[7amota2001](https://github.com/7amota2001)

## 📞 Support

For issues, questions, or suggestions, please open an issue in the GitHub repository.
