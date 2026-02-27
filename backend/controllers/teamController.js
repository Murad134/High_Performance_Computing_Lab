
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

// List of fields to convert from comma-separated string to array
const arrayFields = [
  "visionStatement",
  "mission",
  "coreResearchAreas",
  "researchMethodology",
  "softwareTechnical",
  "publicationEthics",
  "fundingStrategy",
  "impactAcademic",
  "futureMission",
];

// CREATE TEAM UNDER DEPARTMENT
exports.createTeam = async (req, res) => {
  try {
    const departments = getCollection("departments");

    const teamData = req.body;

    if (!teamData.departmentNo) {
      return res.status(400).json({ message: "Department is required" });
    }

    // Convert comma-separated strings to arrays
    arrayFields.forEach((field) => {
      if (teamData[field] && typeof teamData[field] === "string") {
        teamData[field] = teamData[field]
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      } else {
        teamData[field] = [];
      }
    });

    const newTeam = {
      _id: new ObjectId(), // generate separate team id
      ...teamData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await departments.updateOne(
      { departmentNo: teamData.departmentNo },
      { $push: { teams: newTeam } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL TEAMS (Flattened)
exports.getAllTeams = async (req, res) => {
  try {
    const departments = getCollection("departments");

    const allDepartments = await departments.find().toArray();

    const teams = [];

    allDepartments.forEach((dept) => {
      if (dept.teams && dept.teams.length > 0) {
        dept.teams.forEach((team) => {
          teams.push({
            ...team,
            departmentName: dept.name,
            departmentNo: dept.departmentNo,
          });
        });
      }
    });

    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateTeam = async (req, res) => {
  try {
    const departments = getCollection("departments");
    const { teamId } = req.params;
    const updatedData = req.body;

    // Convert comma-separated strings to arrays
    const arrayFields = [
      "visionStatement",
      "mission",
      "coreResearchAreas",
      "researchMethodology",
      "softwareTechnical",
      "publicationEthics",
      "fundingStrategy",
      "impactAcademic",
      "futureMission",
    ];

    arrayFields.forEach((field) => {
      if (updatedData[field] && typeof updatedData[field] === "string") {
        updatedData[field] = updatedData[field]
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    });

    // Build $set for nested team update
    const setObject = Object.fromEntries(
      Object.entries(updatedData).map(([key, value]) => [`teams.$.${key}`, value])
    );
    setObject["teams.$.updatedAt"] = new Date();

    // Update the team inside its department
    const result = await departments.updateOne(
      { "teams._id": new ObjectId(teamId) },
      { $set: setObject }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({ message: "Team updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TEAM
exports.deleteTeam = async (req, res) => {
  try {
    const departments = getCollection("departments");
    const { teamId } = req.params;

    const result = await departments.updateOne(
      { "teams._id": new ObjectId(teamId) },
      { $pull: { teams: { _id: new ObjectId(teamId) } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};