module.exports = [
  // ---------- auth-service ----------
  {
    path: '/users',
    target: process.env.AUTH_SERVICE_URL,
    requiresAuth: false, // userRoutes.js নিজের ভেতরেই কোন সাব-রুট প্রোটেক্টেড ঠিক করে
  },

  // ---------- content-service (⚠️ /api prefix আছে) ----------
  {
    path: '/home',
    target: process.env.CONTENT_SERVICE_URL,
    requiresAuth: false,
  },
  {
    path: '/welcomehome',
    target: process.env.CONTENT_SERVICE_URL,
    rewriteTo: '/home',
    requiresAuth: false,
  },
  {
    path: '/about-lab',
    target: process.env.CONTENT_SERVICE_URL,
    requiresAuth: false,
  },
  {
    path: '/aboutlab',
    target: process.env.CONTENT_SERVICE_URL,
    rewriteTo: '/about-lab',
    requiresAuth: false,
  },
  {
    path: '/about-prof',
    target: process.env.CONTENT_SERVICE_URL,
    requiresAuth: false,
  },
  {
    path: '/aboutprof',
    target: process.env.CONTENT_SERVICE_URL,
    rewriteTo: '/about-prof',
    requiresAuth: false,
  },
  {
    path: '/contact',
    target: process.env.CONTENT_SERVICE_URL,
    requiresAuth: false,
  },
  {
    path: '/footer',
    target: process.env.CONTENT_SERVICE_URL,
    requiresAuth: false,
  },
  {
    path: '/images',
    target: process.env.CONTENT_SERVICE_URL,
    requiresAuth: false,
  },

  // ---------- academic-service ----------
  {
    path: '/departments',
    target: process.env.ACADEMIC_SERVICE_URL,
    requiresAuth: false,
  },
  {
    path: '/teams',
    target: process.env.ACADEMIC_SERVICE_URL,
    requiresAuth: false,
  },
  {
    path: '/student-projects',
    target: process.env.ACADEMIC_SERVICE_URL,
    requiresAuth: false,
  },
  {
    path: '/studentproject',
    target: process.env.ACADEMIC_SERVICE_URL,
    rewriteTo: '/student-projects',
    requiresAuth: false,
  },

  // ---------- research-service ----------
  {
    path: '/books',
    target: process.env.RESEARCH_SERVICE_URL,
    requiresAuth: false,
  },
  {
    path: '/conferences',
    target: process.env.RESEARCH_SERVICE_URL,
    requiresAuth: false,
  },
  {
    path: '/journals',
    target: process.env.RESEARCH_SERVICE_URL,
    requiresAuth: false,
  },

  // ---------- dashboard-service ----------
  {
    path: '/dashboard',
    target: process.env.DASHBOARD_SERVICE_URL,
    requiresAuth: true, // dashboard সবসময় admin-only
  },
];