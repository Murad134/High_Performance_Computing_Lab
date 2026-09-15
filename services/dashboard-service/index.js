require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/dashboard', dashboardRoutes);

// সাধারণ health-check রুট — Docker/monitoring-এর জন্য কাজে লাগবে
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'dashboard-service' }));

// সবার শেষে একটা fallback error handler
app.use((err, req, res, next) => {
  console.error('[dashboard-service] Unhandled error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Dashboard service running on port ${PORT}`));