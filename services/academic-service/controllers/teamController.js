const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

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

// ================= HELPER: match team by string OR ObjectId =================
const findTeamQuery = (teamId) => {
  try {
    return { $or: [{ "teams._id": teamId }, { "teams._id": new ObjectId(teamId) }] };
  } catch {
    return { "teams._id": teamId };
  }
};

const findPullFilter = (teamId) => {
  try {
    return { $in: [teamId, new ObjectId(teamId)] };
  } catch {
    return teamId;
  }
};

// ================= CREATE TEAM =================
exports.createTeam = async (req, res) => {
  try {
    const departments = getCollection("departments");
    const teamData = req.body;

    if (!teamData.departmentNo) {
      return res.status(400).json({ message: "Department is required" });
    }

    if (Array.isArray(teamData.members)) {
      teamData.members = teamData.members.map((m) => ({
        _id: new ObjectId(),   // ✅ store as ObjectId (consistent)
        name: m.name || "",
        email: m.email || "",
        portfolio: m.portfolio || "",
      }));
    } else {
      teamData.members = [];
    }

    arrayFields.forEach((field) => {
      if (teamData[field] && typeof teamData[field] === "string") {
        teamData[field] = teamData[field]
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean);
      } else {
        teamData[field] = [];
      }
    });

    const newTeam = {
      _id: new ObjectId(),   // ✅ store as ObjectId (consistent)
      ...teamData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await departments.updateOne(
      { departmentNo: teamData.departmentNo },
      { $push: { teams: newTeam } }
    );

    if (!result.modifiedCount) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL TEAMS =================
exports.getAllTeams = async (req, res) => {
  try {
    const departments = getCollection("departments");
    const allDepartments = await departments.find().toArray();

    const teams = [];

    allDepartments.forEach((dept) => {
      if (Array.isArray(dept.teams)) {
        dept.teams.forEach((team) => {
          teams.push({
            ...team,
            // ✅ always send _id as plain string to frontend
            _id: team._id?.toString(),
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

// ================= UPDATE TEAM =================
exports.updateTeam = async (req, res) => {
  try {
    const departments = getCollection("departments");
    const { teamId } = req.params;
    const updatedData = req.body;

    if (Array.isArray(updatedData.members)) {
      updatedData.members = updatedData.members.map((m) => ({
        _id: m._id ? new ObjectId(m._id) : new ObjectId(),
        name: m.name || "",
        email: m.email || "",
        portfolio: m.portfolio || "",
      }));
    }

    arrayFields.forEach((field) => {
      if (updatedData[field] && typeof updatedData[field] === "string") {
        updatedData[field] = updatedData[field]
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean);
      }
    });

    const setObject = {};
    Object.keys(updatedData).forEach((key) => {
      if (key !== "_id") {
        setObject[`teams.$.${key}`] = updatedData[key];
      }
    });
    setObject["teams.$.updatedAt"] = new Date();

    // ✅ Try string match first, fallback to ObjectId
    let result = await departments.updateOne(
      { "teams._id": teamId },
      { $set: setObject }
    );

    if (!result.modifiedCount) {
      result = await departments.updateOne(
        { "teams._id": new ObjectId(teamId) },
        { $set: setObject }
      );
    }

    if (!result.modifiedCount) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({ message: "Team updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE TEAM =================
exports.deleteTeam = async (req, res) => {
  try {
    const departments = getCollection("departments");
    const { teamId } = req.params;

    // ✅ Try string match first, fallback to ObjectId
    let result = await departments.updateOne(
      { "teams._id": teamId },
      { $pull: { teams: { _id: teamId } } }
    );

    if (!result.modifiedCount) {
      const oid = new ObjectId(teamId);
      result = await departments.updateOne(
        { "teams._id": oid },
        { $pull: { teams: { _id: oid } } }
      );
    }

    if (!result.modifiedCount) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};