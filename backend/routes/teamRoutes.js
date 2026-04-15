const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");



const verifyToken = require('../middleware/verifyFBToken');
const verifyAdmin = require('../middleware/verifyAdmin');


router.post("/", verifyToken, verifyAdmin, teamController.createTeam);
router.get("/", teamController.getAllTeams);
router.put("/:teamId", verifyToken, verifyAdmin, teamController.updateTeam); // ✅ fixed
// DELETE /teams/:teamId
router.delete("/:teamId", verifyToken, verifyAdmin, teamController.deleteTeam);

module.exports = router;