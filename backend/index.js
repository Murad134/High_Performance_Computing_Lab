const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectToDb } = require('./config/db');

const app = express();
const port = process.env.PORT || 2500;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

// ✅ Test route
app.get('/', (req, res) => res.send('Project Backend is running'));

// ✅ Routers
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
const otherCountryProjectRoutes = require('./routes/otherCountryProjectRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const imageRoutes = require('./routes/imageRoutes');
const homeRoutes = require('./routes/homeRoutes'); 


// ✅ Use routers
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
app.use('/other-country-projects', otherCountryProjectRoutes);
app.use('/dashboard', dashboardRoutes);

// ✅ Image routes
app.use('/images', imageRoutes);
app.use('/api/home', homeRoutes);
// ✅ Start server after DB connection
async function start() {
    try {
        await connectToDb();
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (err) {
        console.error('Failed to start server', err);
        process.exit(1);
    }
}

start();