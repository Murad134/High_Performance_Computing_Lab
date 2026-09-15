const axios = require('axios');
const { getCachedStats, setCachedStats } = require('../utils/statsCache');
const mapToLegacyShape = require('../utils/mapToLegacyShape');

const headers = { 'x-internal-secret': process.env.INTERNAL_SECRET };
const TIMEOUT_MS = 3000;

const getDashboardStats = async (req, res) => {
  const cached = getCachedStats();
  if (cached) {
    return res.json({ ...cached, fromCache: true });
  }

  const requests = [
    axios.get(`${process.env.AUTH_SERVICE_URL}/internal/stats/users`, { headers, timeout: TIMEOUT_MS }),
    axios.get(`${process.env.ACADEMIC_SERVICE_URL}/internal/stats/academic`, { headers, timeout: TIMEOUT_MS }),
    axios.get(`${process.env.RESEARCH_SERVICE_URL}/internal/stats/research`, { headers, timeout: TIMEOUT_MS }),
    axios.get(`${process.env.CONTENT_SERVICE_URL}/internal/stats/content`, { headers, timeout: TIMEOUT_MS }),
  ];

  const results = await Promise.allSettled(requests);
  const [userStats, academicStats, researchStats, contentStats] = results;

  const raw = {
    users: userStats.status === 'fulfilled' ? userStats.value.data : { error: 'unavailable' },
    academic: academicStats.status === 'fulfilled' ? academicStats.value.data : { error: 'unavailable' },
    research: researchStats.status === 'fulfilled' ? researchStats.value.data : { error: 'unavailable' },
    content: contentStats.status === 'fulfilled' ? contentStats.value.data : { error: 'unavailable' },
  };

  const legacyShapedResponse = mapToLegacyShape(raw);

  const allFailed = results.every((r) => r.status === 'rejected');
  if (!allFailed) {
    setCachedStats(legacyShapedResponse);
  }

  res.json({ ...legacyShapedResponse, fromCache: false });
};

module.exports = { getDashboardStats };