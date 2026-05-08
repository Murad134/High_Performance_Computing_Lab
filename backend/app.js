const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const { connectToDb } = require('./config/db');

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
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Static folder - keep for backward compatibility with old images
app.use('/uploads', express.static('uploads'));

// Favicon routes to avoid 404 logs
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/favicon.png', (req, res) => res.status(204).end());

// Test route
app.get('/', (req, res) => {
    res.send('Project Backend is running');
});

// Health route for deployment checks
app.get('/health', async (req, res) => {
    const checks = {
        db: false,
        firebase: admin.apps.length > 0,
    };

    try {
        await connectToDb();
        checks.db = true;
    } catch (error) {
        // DB check failed
    }

    const ok = checks.db && checks.firebase;
    return res.status(ok ? 200 : 503).json({
        status: ok ? 'ok' : 'degraded',
        checks,
        uptime: process.uptime(),
    });
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large' });
  }
  if (err.name === 'MulterError') {
    return res.status(400).json({ error: err.message, stack: err.stack });
  }
  res.status(500).json({ error: err.message || 'Internal server error', details: err.stack });
});

module.exports = app;