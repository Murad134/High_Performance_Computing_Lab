// const express = require('express');
// const router = express.Router();
// const { getCollection } = require('../config/db');

// router.get('/stats', async (req, res) => {
//   try {
//     // collections
//     const usersCol = getCollection('users');
//     const journalsCol = getCollection('journals');
//     const studentCol = getCollection('studentProject');
//     const deptCol = getCollection('departments');

//     // ===== COUNTS =====

//     // 👥 Members (users)
//     const memberCount = await usersCol.countDocuments();

//     // 📘 Publications (journals)
//     const publicationCount = await journalsCol.countDocuments();

//     // 🎓 Student Projects (type = project)
//     const projectCount = await studentCol.countDocuments({
//       type: "project"
//     });

//     // 🎓 Thesis (type = thesis)
//     const thesisCount = await studentCol.countDocuments({
//       type: "thesis"
//     });

//     // 🏢 Departments
//     const departmentCount = await deptCol.countDocuments();

//     // 👥 Teams (nested inside departments)
//     const teamAgg = await deptCol.aggregate([
//       {
//         $project: {
//           totalTeams: { $size: { $ifNull: ["$teams", []] } }
//         }
//       },
//       {
//         $group: {
//           _id: null,
//           total: { $sum: "$totalTeams" }
//         }
//       }
//     ]).toArray();

//     const teamCount = teamAgg[0]?.total || 0;

//     res.send({
//       members: memberCount,
//       publications: publicationCount,
//       projects: projectCount,
//       thesis: thesisCount,
//       departments: departmentCount,
//       teams: teamCount,

//     });

//   } catch (error) {
//     console.error("Dashboard stats error:", error);
//     res.status(500).send({ message: "Failed to fetch stats" });
//   }
// });
// module.exports = router;




const express = require('express');
const router = express.Router();
const { getCollection } = require('../config/db');

router.get('/stats', async (req, res) => {
    try {
        // collections
        const usersCol = getCollection('users');
        const journalsCol = getCollection('journals');
        const studentCol = getCollection('studentProject');
        const deptCol = getCollection('departments');

        // ===== COUNTS (PARALLEL for performance) =====
        const [
            memberCount,
            publicationCount,
            projectCount,
            thesisCount,
            departmentCount
        ] = await Promise.all([
            usersCol.countDocuments(),
            journalsCol.countDocuments(),
            studentCol.countDocuments({ type: "project" }),
            studentCol.countDocuments({ type: "thesis" }),
            deptCol.countDocuments()
        ]);

        // 👥 Teams (nested inside departments)
        const teamAgg = await deptCol.aggregate([
            {
                $project: {
                    totalTeams: { $size: { $ifNull: ["$teams", []] } }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalTeams" }
                }
            }
        ]).toArray();

        const teamCount = teamAgg[0]?.total || 0;

        // ===== 🔥 LAST UPDATED DATE =====

        const [latestJournal] = await journalsCol
            .find({})
            .sort({ updated_at: -1 })
            .limit(1)
            .toArray();

        const [latestUser] = await usersCol
            .find({})
            .sort({ last_log_in: -1 })
            .limit(1)
            .toArray();

        const [latestProject] = await studentCol
            .find({})
            .sort({ _id: -1 }) // fallback
            .limit(1)
            .toArray();

        const latestDates = [
            latestJournal?.updated_at,
            latestUser?.last_log_in,
            latestProject?._id?.getTimestamp?.(),
        ].filter(Boolean);

        const lastUpdated =
            latestDates.length > 0
                ? new Date(Math.max(...latestDates.map(d => new Date(d))))
                : null;

        // ===== RESPONSE =====
        res.send({
            members: memberCount,
            publications: publicationCount,
            projects: projectCount,
            thesis: thesisCount,
            departments: departmentCount,
            teams: teamCount,
            lastUpdated, // 🔥 NEW FIELD
        });

    } catch (error) {
        console.error("Dashboard stats error:", error);
        res.status(500).send({ message: "Failed to fetch stats" });
    }
});

module.exports = router;