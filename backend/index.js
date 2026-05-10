const express = require('express');
require('dotenv').config();
const cors = require('cors');
const admin = require('firebase-admin');
const { connectToDb } = require('./config/db');

const app = express();
const port = process.env.PORT || 2500;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
const allowedOrigins = new Set([
    frontendUrl,
    'http://localhost:5173',
    'http://localhost:5174',
].filter(Boolean));

// ✅ Middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.has(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
}));
app.use(express.json());

// ✅ Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

// ✅ Test route
app.get('/', (req, res) => res.send('Project Backend is running'));

// ✅ Health route for deployment checks
app.get('/health', async (req, res) => {
    const checks = {
        db: false,
        firebase: admin.apps.length > 0,
    };

    try {
        await connectToDb();
        checks.db = true;
    } catch (error) {
        console.error('Health DB check failed:', error.message);
    }

    const ok = checks.db && checks.firebase;
    return res.status(ok ? 200 : 503).json({
        status: ok ? 'ok' : 'degraded',
        checks,
        uptime: process.uptime(),
    });
});

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
const dashboardRoutes = require('./routes/dashboardRoutes');
const imageRoutes = require('./routes/imageRoutes');
const homeRoutes = require('./routes/homeRoutes');
const bookRoutes = require('./routes/bookRoutes');

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
app.use('/dashboard', dashboardRoutes);
app.use('/books', bookRoutes);

// ✅ Image routes
app.use('/images', imageRoutes);
app.use('/welcomehome', homeRoutes);
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


// require('dotenv').config();
// const { connectToDb } = require('./config/db');
// const app = require('./app');

// const port = process.env.PORT || 2500;

// async function start() {
//     try {
//         await connectToDb();
//         app.listen(port, () => {
//             console.log(`Server running on port ${port}`);
//         });
//     } catch (err) {
//         console.error('Failed to start server', err);
//         process.exit(1);
//     }
// }

// start();