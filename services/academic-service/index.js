const express = require("express");
require("dotenv").config();

const { connectToDb } = require("./config/db");

const departmentRoutes = require("./routes/departmentRoutes");
const teamRoutes = require("./routes/teamRoutes");
const studentProjectRoutes = require("./routes/studentProjectRoutes");
const internalRoutes = require("./routes/internalRoutes");

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "academic-service",
    message: "Academic service running",
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
  });
});

// Routes
app.use("/departments", departmentRoutes);
app.use("/teams", teamRoutes);
app.use("/student-projects", studentProjectRoutes);

// Internal Routes
app.use("/internal", internalRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start Server
const startServer = async () => {
  try {
    await connectToDb();

    app.listen(PORT, () => {
      console.log(`Academic service running on port ${PORT}`);
      console.log("MongoDB connected");
    });
  } catch (error) {
    console.error("Failed to start academic service:", error);
    process.exit(1);
  }
};

startServer();