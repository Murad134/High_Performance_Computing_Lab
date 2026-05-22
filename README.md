# Personal Lab (High Performance Computing-HPC) Management System

A scalable and role-based full-stack web application designed to streamline the management of academic research laboratory activities, publications, supervision records, research teams, and member administration.

The platform provides a centralized digital ecosystem where professors, researchers, students, and administrators can efficiently manage and showcase research-related information through a modern, secure, and responsive web interface.

---

## 🌐 Live Links

- **Frontend**: https://high-performance-computing-lab-2vkn.vercel.app
- **Backend API**: https://high-performance-computing-lab.vercel.app

---

# Project Overview

The **Personal Lab (HPC) Management System** was developed to solve the limitations of manually maintained or static laboratory websites commonly used in academic environments.

Traditional research laboratory websites often suffer from:

* Difficult content management
* Outdated information
* Lack of centralized administration
* Poor scalability
* Weak access control
* Inefficient publication management

To overcome these challenges, this system introduces a dynamic and scalable architecture that supports:

* Real-time data management
* Role-based administration
* Secure authentication
* Research publication management
* Thesis and project supervision tracking
* Student and alumni management
* Interactive laboratory presentation

The system is designed with modular architecture principles to ensure maintainability, scalability, and future extensibility.

---

# Key Features

## Core Functionalities

* Full Stack MERN-Based Architecture
* Role-Based Access Control (RBAC)
* JWT Authentication & Authorization
* Secure Password Encryption (bcrypt)
* Dynamic CRUD Operations
* Real-Time Data Synchronization
* Responsive User Interface
* Research Department & Team Management
* Academic Publication Management
* Thesis & Project Supervision Tracking
* Student & Alumni Management
* Administrative Dashboard
* Super Admin Role Management
* Scalable Modular Structure
* Optimized Database Operations

---

# User Roles & Permissions

The platform provides three different access levels to ensure secure and structured management of laboratory resources.

---

## Viewer / Public User

General visitors can explore all publicly available laboratory information without authentication.

### Viewer Capabilities

* Browse research departments
* Explore research teams
* View journals, conferences, and books
* Access current and completed projects/thesis
* Explore student and alumni profiles
* View laboratory statistics and achievements
* Access laboratory contact information
* Read detailed research information

---

## Admin

Admins are responsible for managing all laboratory-related operational content.

### Admin Capabilities

### Research Management

* Create, update, and delete research departments
* Manage research teams
* Maintain department details and documentation

### Publication Management

* Manage journal publications
* Manage conference publications
* Manage books and academic resources

### Supervision Management

* Manage current thesis records
* Manage completed thesis records
* Manage current projects
* Manage completed projects
* Update project/thesis status dynamically

### Member Management

* Manage student profiles
* Maintain alumni records
* Update member information

### Website Content Management

* Manage homepage content
* Update laboratory information
* Manage contact details
* Manage footer information
* Upload and update images

### System Features

* Real-time content updates
* Dynamic CRUD operations
* Secure admin panel access

---

## Super Admin

Super Admin has complete authority over the entire system infrastructure and administrative governance.

### Super Admin Capabilities

* All Admin Functionalities
* Create Admin Accounts
* Delete Admin Accounts
* Promote/Demote User Roles
* Manage Super Admin Accounts
* Control Administrative Permissions
* Full System Governance & Monitoring

---

# Technology Stack

## Frontend Technologies

| Technology   | Purpose                    |
| ------------ | -------------------------- |
| React.js     | Interactive UI Development |
| Tailwind CSS | Responsive Styling         |
| JavaScript   | Client-Side Logic          |
| HTML5        | Structure & Markup         |
| CSS3         | Styling & Layout           |

---

## Backend Technologies

| Technology | Purpose                        |
| ---------- | ------------------------------ |
| Node.js    | Server-Side Runtime            |
| Express.js | REST API Development           |
| MongoDB    | NoSQL Database                 |
| JWT        | Authentication & Authorization |
| bcrypt     | Password Security              |

---

## Development Tools

* Visual Studio Code
* Git & GitHub
* Postman
* MongoDB Atlas

---

# System Architecture

The project follows a modern multi-tier architecture for scalability and maintainability.

## Frontend Layer

Handles user interaction and responsive UI rendering using React.js.

## Backend Layer

Provides RESTful APIs, authentication, authorization, and business logic using Node.js and Express.js.

## Database Layer

Stores structured laboratory and user-related information using MongoDB.

---

# Folder Structure

```text
├── backend/
│   ├── api/
│   │   └── index.js
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── firebase.js
│   ├── controllers/
│   │   ├── aboutLabController.js
│   │   ├── aboutProfController.js
│   │   ├── bookController.js
│   │   ├── conferenceController.js
│   │   ├── contactController.js
│   │   ├── dashboardController.js
│   │   ├── imageController.js
│   │   ├── homeController.js
│   │   ├── journalController.js
│   │   ├── studentProjectController.js
│   │   ├── teamController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── verifyAdmin.js
│   │   ├── verifyFBToken.js
│   │   └── verifySuperadmin.js
│   ├── models/
│   │   ├── aboutLabModel.js
│   │   ├── aboutProfModel.js
│   │   ├── bookModel.js
│   │   ├── conferenceModel.js
│   │   ├── contactModel.js
│   │   ├── departmentModel.js
│   │   ├── footerModel.js
│   │   ├── homeModel.js
│   │   ├── imageModel.js
│   │   ├── journalModel.js
│   │   ├── otherCountryProjectModel.js
│   │   ├── studentProjectModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── aboutLabRoutes.js
│   │   ├── aboutProfRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── conferenceRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── departmentRoutes.js
│   │   ├── footerRoutes.js
│   │   ├── homeRoutes.js
│   │   ├── imageRoutes.js
│   │   ├── journalRoutes.js
│   │   ├── studentProjectRoutes.js
│   │   ├── teamRoutes.js
│   │   └── userRoutes.js
│   ├── uploads/
│   ├── app.js
│   ├── index.js
│   ├── package.json
│   └── vercel.json
│
├── frontend/
│   └── Research_lab/
│       ├── public/
│       │   └── assetss/
│       ├── src/
│       │   ├── AdminPages/
│       │   ├── Components/
│       │   ├── Firebase/
│       │   ├── hooks/
│       │   ├── Layouts/
│       │   ├── Pages/
│       │   ├── Provider/
│       │   ├── Router/
│       │   ├── Routes/
│       │   ├── Utility/
│       │   ├── App.jsx
│       │   ├── App.css
│       │   ├── index.css
│       │   ├── main.jsx
│       │   └── utils.jsx
│       ├── index.html
│       ├── package.json
│       ├── tailwind.config.js
│       ├── postcss.config.js
│       ├── vite.config.js
│       └── vercel.json
│
└── README.md
```

---

# Security Features

* JWT-Based Authentication
* Role-Based Authorization
* Protected API Routes
* Password Hashing using bcrypt
* Secure User Session Handling
* Access Restriction for Administrative Routes

---

# Real-Time Functionalities

* Dynamic Data Synchronization
* Instant Frontend Updates
* Real-Time CRUD Operations
* Live Content Rendering
* Efficient State Management

---

# System Modules

The platform is divided into multiple independent and scalable modules to ensure maintainability, flexibility, and efficient management of academic laboratory resources.

---

## Home Module

The homepage acts as the central landing interface of the platform and provides summarized laboratory information.

### Functionalities

* Dynamic Welcome Banner
* Research Laboratory Introduction
* Laboratory Statistics & Achievements
* Featured Research Areas
* Publication Highlights
* Awards & Recognition Section
* Responsive Hero Section

---

## About Module

The About module provides comprehensive information regarding the laboratory and its academic vision.

### Functionalities

* Laboratory Overview
* Mission & Vision
* Research Interests
* Professor Information
* Deputy Lab Head Information
* Academic Background Presentation

---

## Research Module

The Research module manages all departmental and research team related information.

### Department Management

* Create Departments
* Update Department Information
* Delete Departments
* Department Detail Pages
* Department Documentation Support

### Team Management

* Create Research Teams
* Maintain Team Profiles
* Define Research Areas
* Team Vision & Mission
* Research Methodologies
* Funding & Academic Impact Information

---

## Publications Module

The Publications module centralizes all academic publication records.

### Supported Publication Types

* Journals
* Conferences
* Books

### Functionalities

* Add Publications
* Update Publications
* Delete Publications
* External Publication Links
* Publication Metadata Management
* Categorized Publication Display

---

## Supervisions Module

This module manages academic projects and thesis supervision records.

### Thesis Management

* Current Thesis Tracking
* Completed Thesis Management
* Thesis Status Control
* Student Information Management

### Project Management

* Current Project Tracking
* Completed Project Records
* Project Lifecycle Management
* Project Documentation Support

---

## Members Module

The Members module organizes student and alumni information.

### Supported Categories

* BSc Students
* MSc Students
* PhD Students
* Alumni

### Functionalities

* Student Profile Management
* Alumni Record Management
* Academic Information Display
* Project/Thesis Association
* Current ↔ Alumni Status Transition

---

## Contact Module

This module manages official communication and laboratory contact information.

### Functionalities

* Laboratory Contact Information
* Office Address Management
* Email & Social Links
* Professor Contact Profiles
* Institutional References

---

# Authentication & Authorization

The system implements modern authentication and authorization mechanisms to ensure secure access control and protected administrative operations.

## Authentication Features

* JWT-Based Authentication
* Secure Login System
* Protected User Sessions
* Token Verification
* Persistent Authentication

## Authorization Features

* Role-Based Access Control (RBAC)
* Protected Administrative Routes
* Permission-Based Operations
* Secure Resource Access

---

# Database Design & Management

The platform uses MongoDB as the primary database system for handling structured and semi-structured laboratory data efficiently.

## Database Features

* Scalable NoSQL Architecture
* Optimized Query Operations
* Structured Research Data Management
* Efficient Relationship Handling
* Dynamic Content Storage
* Secure User Data Management

---

# Real-Time Functionalities

The platform supports dynamic real-time interactions between the frontend and backend systems.

## Real-Time Features

* Dynamic Data Synchronization
* Instant CRUD Updates
* Automatic Frontend Rendering
* Live Content Modification
* Efficient State Management
* Optimized API Communication

---

# API & Backend Functionalities

The backend architecture is designed using RESTful API principles.

## Backend Features

* REST API Architecture
* Secure Route Handling
* Middleware-Based Authorization
* Error Handling System
* Request Validation
* Database Query Optimization

---

# Responsive Design

The entire system is optimized for multiple screen sizes and modern devices.

## Responsive Features

* Mobile-Friendly Layout
* Tablet Compatibility
* Desktop Optimization
* Responsive Navigation
* Adaptive UI Components

---

# Screenshots

# Home Page

## Welcome Section

![Welcome](images/Interface/Welcome.png)

---

## About Section

![About Section](images/Interface/aboutpicture.png)

---

## Laboratory Statistics

![Lab Statistics](images/Interface/Lab_Statistics.png)

---

## Research Department Section

![Department Section](images/Interface/DepartmntHome.png)

---

## Publication Highlight Section

![Publication Section](images/Interface/PublicationHome.png)

---

## Awards & Achievements Section

![Awards Section](images/Interface/AwardsHome.png)

---

# About Page

![About Page](images/Interface/about.png)

---

# Research Module

## Research Departments

![Research Department](images/Interface/Research_Department.png)

---

## Department Details

![Department Details](images/Interface/Department_Details.png)

---

## Research Teams

![Research Team](images/Interface/Team.png)

---

## Team Details

![Team Details](images/Interface/TeamDetails.png)

---

# Supervisions Module

## Current Thesis

![Current Thesis](images/Interface/Current_Thesis.png)

---

## Completed Thesis

![Completed Thesis](images/Interface/Completed_Thesis.png)

---

## Current Projects

![Current Project](images/Interface/Current_Project.png)

---

## Completed Projects

![Completed Project](images/Interface/Completed_Project.png)

---

# Members Module

## Current Students

![Current Students](images/Interface/CurrentStudent.png)

---

## Alumni Members

![Alumni](images/Interface/Alumni.png)

---

# Contact Module

![Contact](images/Interface/Contact.png)

---

# Authentication Interfaces

## Registration Interface

![Register](images/Interface/Register.png)

---

## Login Interface

![Login](images/Interface/login.png)

---

# Administrative Dashboard

## Dashboard Overview

![Dashboard](images/Interface/AD_Dashboard.png)

---

## Homepage Management

![Home CRUD](images/Interface/AD_Home.png)

---

## Welcome Banner Management

![Welcome CRUD](images/Interface/AD_welcome.png)

---

## Department Management

![Department CRUD](images/Interface/AD_Department.png)

---

## Team Management

![Team CRUD](images/Interface/AD_Team.png)

---

## Journal Management

![Journals CRUD](images/Interface/AD_jounals.png)

---

## Conference Management

![Conferences CRUD](images/Interface/AD_Conferences.png)

---

## Book Management

![Books CRUD](images/Interface/AD_Books.png)

---

## Student & Member Management

![Member CRUD](images/Interface/AD_Member.png)

---

## Contact Information Management

![Contact CRUD](images/Interface/AD_contact.png)

---

# Super Admin Dashboard

![Super Admin](images/Interface/Super_AD.png)

---

# Installation Guide

## Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

---

## Navigate to Project Directory

```bash
cd project-name
```

---

## Install Dependencies

### Frontend

```bash
npm install
```

### Backend

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the backend root directory and configure the following variables:

```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
CLIENT_URL=YOUR_FRONTEND_URL
```

---

# Running the Project Locally

## Start Backend Server

```bash
npm run server
```

---

## Start Frontend Application

```bash
npm run dev
```

---

# Future Enhancements

The platform is designed with scalability in mind and can be extended with advanced functionalities in future releases.

## Planned Improvements

* Advanced Search & Filtering System
* Cloud Deployment & Scalability
* Two-Factor Authentication (2FA)
* Advanced Analytics Dashboard
* Automated Notification System
* Research Collaboration Features
* Mobile Application Support
* Report Generation System
* AI-Based Recommendation Features

---

# Conclusion

The Personal Lab (High Performance Computing-HPC) Management System successfully delivers a centralized, scalable, and secure solution for managing academic laboratory activities and research resources.

The platform enhances:

* Research visibility
* Administrative efficiency
* Student and researcher collaboration
* Academic publication management
* Secure laboratory administration

By integrating modern web technologies with role-based management architecture, the system provides a robust digital infrastructure suitable for modern academic and research environments.

---
