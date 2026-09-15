const express = require("express");
require("dotenv").config();

const { connectToDb } = require("./config/db");

const bookRoutes = require("./routes/bookRoutes");
const conferenceRoutes = require("./routes/conferenceRoutes");
const journalRoutes = require("./routes/journalRoutes");
const internalRoutes = require("./routes/internalRoutes");

const app = express();

const PORT = process.env.PORT || 5004;

// Middleware
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "research-service",
    message: "Research service running",
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
  });
});

// Research Routes
app.use("/books", bookRoutes);
app.use("/conferences", conferenceRoutes);
app.use("/journals", journalRoutes);

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
      console.log(`Research service running on port ${PORT}`);
      console.log("MongoDB connected");
    });
  } catch (error) {
    console.error("Failed to start research service:", error);
    process.exit(1);
  }
};

startServer();