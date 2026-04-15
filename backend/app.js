const express = require('express');
const cors = require('cors');

const verifyToken = require('./middleware/verifyFBToken');



// Routers
const footerRoutes = require('./routes/footerRoutes');
const contactRoutes = require('./routes/contactRoutes');
const aboutLabRoutes = require('./routes/aboutLabRoutes');
const aboutProfRoutes = require('./routes/aboutProfRoutes');
const studentProjectRoutes = require('./routes/studentProjectRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const teamRoutes = require('./routes/teamRoutes');
const journalRoutes = require('./routes/journalRoutes');
const conferenceRoutes = require('./routes/conferenceRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const imageRoutes = require('./routes/imageRoutes');
const homeRoutes = require('./routes/homeRoutes');
const bookRoutes = require('./routes/bookRoutes');

// create app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder
app.use('/uploads', express.static('uploads'));

// Test route
app.get('/', (req, res) => {
    res.send('Project Backend is running');
});

// Routes
app.use('/footer', footerRoutes);
app.use('/contact', contactRoutes);
app.use('/aboutlab', aboutLabRoutes);
app.use('/aboutprof', aboutProfRoutes);
app.use('/studentproject', studentProjectRoutes);
app.use('/departments', departmentRoutes);
app.use('/teams', teamRoutes);
app.use('/journals', journalRoutes);
app.use('/conferences', conferenceRoutes);
app.use('/users', userRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/books', bookRoutes);
app.use('/images', imageRoutes);
app.use('/welcomehome', homeRoutes);

module.exports = app;