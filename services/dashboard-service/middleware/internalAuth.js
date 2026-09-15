const axios = require('axios');

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const response = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/internal/verify-token`,
      { token },
      {
        headers: { 'x-internal-secret': process.env.INTERNAL_SECRET },
        timeout: 3000,
      }
    );

    if (!['admin', 'superadmin'].includes(response.data.role)) {
      return res.status(403).json({ message: 'Forbidden: admin access only' });
    }

    req.user = response.data;
    next();
  } catch (err) {
    console.error('[dashboard-service] Auth verification failed:', err.message);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = verifyAdmin;