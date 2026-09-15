const express = require("express");
const { connectToDb } = require("./config/db");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5002;

// ============================
// Global Middleware
// ============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// Routes
// ============================

const homeRoutes = require("./routes/homeRoutes");
const aboutLabRoutes = require("./routes/aboutLabRoutes");
const aboutProfRoutes = require("./routes/aboutProfRoutes");
const contactRoutes = require("./routes/contactRoutes");
const footerRoutes = require("./routes/footerRoutes");
const imageRoutes = require("./routes/imageRoutes");

const internalRoutes = require("./routes/internalRoutes");

// ============================
// Public Content Routes
// ============================

app.use("/home", homeRoutes);
app.use("/about-lab", aboutLabRoutes);
app.use("/about-prof", aboutProfRoutes);
app.use("/contact", contactRoutes);
app.use("/footer", footerRoutes);
app.use("/images", imageRoutes);

// ============================
// Internal Routes
// ============================

app.use("/internal", internalRoutes);

// ============================
// Root
// ============================

app.get("/", (req, res) => {
    res.status(200).json({
        service: "Content-service is running now",
        status: "running",
        port: PORT,
    });
});

// ============================
// 404 Handler
// ============================

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
});

// ============================
// Global Error Handler
// ============================

app.use((err, req, res, next) => {
    console.error("Content Service Error:", err);

    res.status(500).json({
        message: "Internal server error",
    });
});

// ============================
// Start Server
// ============================

async function startServer() {
    try {
        await connectToDb();

        app.listen(PORT, () => {
            console.log(`Content service running on port ${PORT}`);
        });
    } catch (error) {
        console.error(
            "Failed to start content service:",
            error
        );

        process.exit(1);
    }
}

startServer();