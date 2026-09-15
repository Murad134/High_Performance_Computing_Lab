
require("dotenv").config();

const express = require("express");

const {
    connectToDb,
} = require("./config/db");

const userRoutes =
    require("./routes/userRoutes");

const internalRoutes =
    require("./routes/internalRoutes");


const app = express();

const PORT =
    process.env.PORT || 5001;


// Middleware
app.use(express.json());


// Health check
app.get("/", (req, res) => {
    res.status(200).send(
        "Auth Service running"
    );
});


// User routes
app.use(
    "/users",
    userRoutes
);


// Internal routes
app.use(
    "/internal",
    internalRoutes
);


// Start server
async function startServer() {
    try {
        await connectToDb();

        app.listen(PORT, () => {
            console.log(
                `Auth Service running on port ${PORT}`
            );
        });

    } catch (error) {
        console.error(
            "Failed to start Auth Service:",
            error
        );

        process.exit(1);
    }
}


startServer();