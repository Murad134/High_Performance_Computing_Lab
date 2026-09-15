let cache = {
  data: null,
  timestamp: 0,
};

const CACHE_TTL_MS = 30 * 1000; // ৩০ সেকেন্ড

function getCachedStats() {
  const isExpired = Date.now() - cache.timestamp > CACHE_TTL_MS;
  if (!cache.data || isExpired) return null;
  return cache.data;
}

function setCachedStats(data) {
  cache = { data, timestamp: Date.now() };
}

module.exports = { getCachedStats, setCachedStats };