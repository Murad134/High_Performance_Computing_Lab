require("dotenv").config();

const express = require("express");
const cors = require("cors");

const requestId = require("./middleware/requestId");
const headerSanitizer = require("./middleware/headerSanitizer");
const errorHandler = require("./middleware/errorHandler");
const setupProxy = require("./proxy");

const app = express();

// ========================================
// CORS
// ========================================

const allowedOrigins = new Set(
  [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:5174",
  ].filter(Boolean)
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`Not allowed by CORS: ${origin}`)
      );
    },
    credentials: true,
  })
);

// ========================================
// COMMON MIDDLEWARE
// ========================================

app.use(requestId);
app.use(headerSanitizer);
app.use(express.json());

// ========================================
// HEALTH CHECK
// ========================================

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "API Gateway",
  });
});

// ========================================
// PROXY
// ========================================

setupProxy(app);

// ========================================
// ERROR HANDLER
// ========================================

app.use(errorHandler);

// ========================================
// SERVER
// ========================================

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

// Server error handling
server.on("error", (error) => {
  console.error("API Gateway server error:", error);
});

// Process error handling
process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT EXCEPTION:", error);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
});