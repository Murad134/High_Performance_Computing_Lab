const express = require("express");

const router = express.Router();

const internalAuth = require("../middleware/internalAuth");

const { getCollection } = require('../config/db');

const departmentController = require("../controllers/departmentController");

const {
  getAllStudentProjects,
  getSingleStudentProject,
} = require("../controllers/studentProjectController");

const teamController = require("../controllers/teamController");

/*
 * All routes in this file are protected.
 *
 * Example:
 * GET /internal/departments
 * Header:
 * x-internal-key: YOUR_INTERNAL_SERVICE_KEY
 */
router.use(internalAuth);

// ===============================
// Departments
// ===============================

router.get(
  "/departments",
  departmentController.getDepartments
);

router.get(
  "/departments/:id",
  departmentController.getDepartmentById
);

// ===============================
// Teams
// ===============================

router.get(
  "/teams",
  teamController.getAllTeams
);

// ===============================
// Student Projects / Thesis
// ===============================

router.get(
  "/student-projects",
  getAllStudentProjects
);

router.get(
  "/student-projects/:id",
  getSingleStudentProject
);

router.get('/stats/academic', async (req, res) => {
  try {
    const departmentsCollection = getCollection('departments');
    const projectsCollection = getCollection('studentProject');

    const totalDepartments = await departmentsCollection.countDocuments();

    // Team গুলো department-এর ভেতরে নেস্টেড subdocument, তাই aggregation দিয়ে গুনতে হবে
    const teamAgg = await departmentsCollection.aggregate([
      { $unwind: '$teams' },
      { $count: 'totalTeams' },
    ]);
    const totalTeams = teamAgg[0]?.totalTeams || 0;

    // মোট প্রজেক্ট (thesis বাদ দিয়ে)
    const totalProjects = await projectsCollection.countDocuments({ type: { $ne: 'thesis' } });

    // শুধু thesis টাইপ গুলো
    const totalThesis = await projectsCollection.countDocuments({ type: 'thesis' });

    // Unique student — নাম/ইমেইল দিয়ে distinct করা হচ্ছে যাতে একই ছাত্র একাধিক প্রজেক্টে থাকলেও একবার গোনা হয়
    const uniqueStudentsAgg = await projectsCollection.aggregate([
      { $unwind: '$members' },
      { $group: { _id: '$members.email' } }, // email দিয়ে unique ধরা হচ্ছে; আপনার স্কিমায় ফিল্ডের নাম ভিন্ন হলে বদলে নিন
      { $count: 'uniqueStudents' },
    ]);
    const uniqueStudents = uniqueStudentsAgg[0]?.uniqueStudents || 0;

    // lastUpdated — এই ডোমেইনের যেকোনো কালেকশনে সবচেয়ে সাম্প্রতিক changetimestamp
    const latestDept = await departmentsCollection.findOne({}, { sort: { updated_at: -1 }, projection: { updated_at: 1 } });
    const latestProject = await projectsCollection.findOne({}, { sort: { updated_at: -1 }, projection: { updated_at: 1 } });
    const lastUpdated = [latestDept?.updated_at, latestProject?.updated_at]
      .filter(Boolean)
      .sort((a, b) => b - a)[0] || null;

    res.json({
      totalDepartments,
      totalTeams,
      totalProjects,
      totalThesis,
      uniqueStudents,
      lastUpdated,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch academic stats' });
  }
});
module.exports = router;