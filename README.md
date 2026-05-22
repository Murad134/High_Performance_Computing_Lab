# High-Performance Computing Lab Website

A professional MERN stack application for showcasing high-performance computing research, publications, team members, and academic projects. This full-stack web application provides an intuitive interface for managing and displaying laboratory information with role-based access control.

---

## 🌐 Live Links

- **Frontend**: https://high-performance-computing-lab-2vkn.vercel.app
- **Backend API**: https://high-performance-computing-lab.vercel.app

---

## ✨ Features

### Frontend
- **Responsive Design**: Mobile-first approach with Tailwind CSS and DaisyUI
- **Interactive Components**: Smooth animations and carousel displays for research projects
- **Authentication**: Firebase-based authentication with role-based access control
- **Admin Dashboard**: Comprehensive dashboard for managing lab content
- **Image Management**: Cloudinary integration for optimized image handling
- **SEO Optimized**: Clean URLs and proper meta tags
- **Real-time Data**: Efficient data fetching with React Query (TanStack Query)

### Backend
- **RESTful API**: Well-structured API endpoints for all resources
- **Authentication & Authorization**: Firebase Admin SDK for secure token verification
- **MongoDB Database**: Flexible NoSQL database for storing research data
- **File Upload**: Cloudinary integration for secure image hosting
- **CORS Enabled**: Secure cross-origin requests
- **Static File Serving**: Support for legacy uploads directory

### Modules
- **Home Section**: Lab introduction and highlights
- **About Lab**: Detailed laboratory information
- **About Professor**: Faculty information and bio
- **Research**: Research department overview, research interests, ongoing projects, and research team members
- **Publications**: Books, journals, and conferences
- **Students**: Student showcases organized by degree level - Current & Alumni (BSc, MSc, PhD)
- **Dashboard**: Admin panel for content management
- **Contact**: Contact forms and communication channels

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1** - UI library
- **Vite 7** - Fast build tool
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS 3** - Utility-first CSS framework
- **DaisyUI 5** - Component library
- **React Query (TanStack) 5** - Data fetching & caching
- **Axios 1.13** - HTTP client
- **Firebase 12** - Authentication
- **React Hook Form 7** - Form management
- **Lucide React** - Icon library
- **React Icons 5** - Additional icons
- **SweetAlert2 11** - Alert dialogs
- **React Carousel** - Image carousels

### Backend
- **Node.js & Express 5** - Server framework
- **MongoDB 7** - NoSQL database
- **Firebase Admin SDK 13** - Authentication & authorization
- **Cloudinary** - Image hosting & optimization
- **Multer & Multer Storage Cloudinary** - File upload handling
- **CORS 2.8** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variable management
- **Nodemon** - Development auto-reload

### Database
- **MongoDB** - Primary database
- **Firebase** - Auth service

---

## 📦 Installation Steps

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Firebase project
- Cloudinary account

### Backend Setup

1. **Clone and navigate to backend**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

4. **Start the backend**
```bash
npm run dev
```
Backend will run on `http://localhost:2500`

### Frontend Setup

1. **Navigate to frontend**
```bash
cd frontend/Research_lab
```

2. **Install dependencies**
```bash
npm install
```

4. **Start the frontend**
```bash
npm run dev
```
Frontend will run on `http://localhost:5173`

---

## 🚀 How to Run

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend/Research_lab
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

**Frontend:**
```bash
cd frontend/Research_lab
npm run build
npm run preview
```

**Backend:**
Ensure all environment variables are set for production:
```bash
npm start
```

---

## 📡 API Overview

### Base URL
```
http://localhost:2500
```

### Authentication
All protected routes require Firebase authentication token in headers:
```
Authorization: Bearer <firebase_token>
```

### Main Endpoints

#### Home
- `GET /home` - Get home section data
- `POST /home` - Create/update home section (Admin)

#### About Lab
- `GET /aboutlab` - Get lab information
- `POST /aboutlab` - Update lab information (Admin)

#### About Professor
- `GET /aboutprof` - Get professor information
- `POST /aboutprof` - Update professor information (Admin)

#### Research
- `GET /research` - Get research data
- `POST /research` - Add research (Admin)

#### Publications
- `GET /books` - Get books
- `POST /books` - Add book (Admin)
- `GET /journals` - Get journals
- `POST /journals` - Add journal (Admin)
- `GET /conferences` - Get conferences
- `POST /conferences` - Add conference (Admin)

#### Students & Projects
- `GET /studentprojects` - Get student projects
- `POST /studentprojects` - Add project (Admin)

#### Team
- `GET /team` - Get team members
- `POST /team` - Add team member (Admin)

#### Dashboard
- `GET /dashboard` - Get dashboard statistics (Admin)

#### Contact
- `GET /contact` - Get contact info
- `POST /contact` - Submit contact form
- `POST /contact-admin` - Update contact info (Admin)

#### Images
- `POST /images/upload` - Upload image (via Cloudinary)
- `GET /images` - Get all images

---

## 📁 Folder Structure

```
├── backend/
│   ├── config/
│   │   ├── cloudinary.js       # Cloudinary configuration
│   │   ├── db.js               # MongoDB connection
│   │   └── firebase.js          # Firebase setup
│   ├── controllers/
│   │   ├── homeController.js
│   │   ├── aboutLabController.js
│   │   ├── aboutProfController.js
│   │   ├── studentProjectController.js
│   │   ├── teamController.js
│   │   ├── journalController.js
│   │   ├── conferenceController.js
│   │   ├── bookController.js
│   │   ├── contactController.js
│   │   ├── imageController.js
│   │   └── ...
│   ├── models/
│   │   ├── homeModel.js
│   │   ├── aboutLabModel.js
│   │   ├── studentProjectModel.js
│   │   └── ...
│   ├── routes/
│   │   ├── homeRoutes.js
│   │   ├── aboutLabRoutes.js
│   │   ├── studentProjectRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── ...
│   ├── middleware/
│   │   ├── verifyFBToken.js    # Firebase token verification
│   │   ├── verifyAdmin.js      # Admin role verification
│   │   └── verifySuperadmin.js # Superadmin verification
│   ├── uploads/                 # Legacy uploaded files
│   ├── app.js                   # Express app setup
│   ├── index.js                 # Server entry point
│   ├── package.json
│   └── .env                     # Environment variables
│
├── frontend/
│   └── Research_lab/
│       ├── src/
│       │   ├── Components/
│       │   │   ├── Navbar.jsx
│       │   │   ├── Footer.jsx
│       │   │   ├── HomeComponents/
│       │   │   ├── CardComponents/
│       │   │   └── Details/
│       │   ├── Pages/           # Page components
│       │   ├── AdminPages/      # Admin dashboard pages
│       │   │   ├── Dashboard.jsx
│       │   │   ├── EditMembers.jsx
│       │   │   └── ...
│       │   ├── Layouts/         # Layout components
│       │   ├── Routes/          # Route configuration
│       │   ├── hooks/           # Custom React hooks
│       │   ├── Firebase/        # Firebase configuration
│       │   ├── Provider/        # Context providers
│       │   ├── Utility/         # Utility functions
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   └── index.css
│       ├── public/              # Static assets
│       ├── vite.config.js
│       ├── tailwind.config.js
│       ├── package.json
│       └── .env.local           # Environment variables
│
└── README.md                    # This file
```

---

## 📸 Screenshots

### Home Page
![Home Page](./screenshots/home-page.png)
*Showcase of the main landing page with lab information and research highlights*

### Research Section
![Research](./screenshots/research-section.png)
*Detailed research interests and ongoing projects*

### Publications
![Publications](./screenshots/publications.png)
*Journal articles, conferences, and books published by the lab*

### Student Projects
![Student Projects](./screenshots/student-projects.png)
*Showcase of student achievements and project portfolios*

### Admin Dashboard
![Admin Dashboard](./screenshots/admin-dashboard.png)
*Admin panel for managing lab content*

### Team Members
![Team](./screenshots/team-members.png)
*Lab team members and staff directory*

> **Note**: To add actual screenshots:
> 1. Take screenshots of your application
> 2. Create a `screenshots/` folder in the root directory
> 3. Save images as: `home-page.png`, `research-section.png`, etc.
> 4. Uncomment or update the image paths above

---

## 🚀 Future Improvements

- [ ] **Search & Filters**: Implement advanced search and filtering for publications and projects
- [ ] **Analytics Dashboard**: Add Google Analytics integration for tracking lab website analytics
- [ ] **Email Notifications**: Send email notifications for new contact submissions
- [ ] **Blog Section**: Add blog/news section for lab updates and announcements
- [ ] **PDF Downloads**: Allow downloading of research papers and publications as PDF
- [ ] **Social Media Integration**: Add social media feeds and sharing features
- [ ] **Dark Mode**: Implement dark theme support
- [ ] **Multi-language Support**: Add internationalization (i18n) for multiple languages
- [ ] **Video Gallery**: Implement video gallery for lab demos and presentations
- [ ] **Testing**: Add unit and integration tests (Jest, Vitest, Supertest)
- [ ] **CI/CD Pipeline**: Set up automated testing and deployment with GitHub Actions
- [ ] **API Documentation**: Generate Swagger/OpenAPI documentation
- [ ] **Performance Optimization**: Implement lazy loading and code splitting
- [ ] **Database Indexing**: Optimize MongoDB queries with proper indexing
- [ ] **Rate Limiting**: Add API rate limiting for security

---

## 📝 Environment Variables Reference

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `2500` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `FIREBASE_PROJECT_ID` | Firebase project ID | `hpc-lab-project` |
| `FIREBASE_PRIVATE_KEY` | Firebase private key | (from service account) |
| `FIREBASE_CLIENT_EMAIL` | Firebase client email | (from service account) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | (from dashboard) |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | (from dashboard) |
| `FRONTEND_URL` | Frontend URL | `http://localhost:5173` |

### Frontend (.env.local)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_backend_url` | Backend API URL | `http://localhost:2500` |
| `VITE_firebase_apiKey` | Firebase API key | (from config) |
| `VITE_firebase_authDomain` | Firebase auth domain | (from config) |
| `VITE_firebase_projectId` | Firebase project ID | (from config) |
| `VITE_firebase_storageBucket` | Firebase storage bucket | (from config) |
| `VITE_firebase_messagingSenderId` | Messaging sender ID | (from config) |
| `VITE_firebase_appId` | Firebase app ID | (from config) |

---

## 🔐 Security Features

- **Firebase Authentication**: Secure user authentication
- **JWT Token Verification**: All protected routes verify tokens
- **Role-Based Access Control**: Admin and SuperAdmin roles
- **CORS Protection**: Configured origin whitelist
- **Environment Variables**: Sensitive data protected in .env files
- **Input Validation**: Server-side request validation
- **Cloudinary Security**: Secure image upload and delivery

---

## 📚 Additional Resources

### Documentation
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

### Tutorials
- [MERN Stack Tutorial](https://www.mongodb.com/docs/drivers/node/current/)
- [Firebase Auth with React](https://firebase.google.com/docs/auth)
- [Tailwind CSS & React](https://tailwindcss.com/docs/guides/create-react-app)

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License. See the LICENSE file for details.

---

## 👤 Author

**[Your Name/Organization]**

- GitHub: [@YourUsername](https://github.com/Murad134)
- Email: your.email@example.com
- Institution: [Institution Name]

---

## 📞 Support & Contact

For questions or support:
- Create an issue on GitHub
- Fill the contact form on the website
- Email: [contact-email]

---

## 🎯 Quick Start Checklist

- [ ] Clone the repository
- [ ] Set up MongoDB Atlas account
- [ ] Create Firebase project
- [ ] Set up Cloudinary account
- [ ] Configure `.env` files
- [ ] Install dependencies (backend & frontend)
- [ ] Run development servers
- [ ] Access http://localhost:5173
- [ ] Admin login and test dashboard

---

**Last Updated**: May 2026  
**Version**: 1.0.0

---

*Made with ❤️ for the High-Performance Computing Lab*
