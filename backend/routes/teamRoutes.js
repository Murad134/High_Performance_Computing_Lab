const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.post("/", teamController.createTeam);
router.get("/", teamController.getAllTeams);
router.put("/:teamId", teamController.updateTeam); // ✅ fixed
// DELETE /teams/:teamId
router.delete("/:teamId", teamController.deleteTeam);

module.exports = router;