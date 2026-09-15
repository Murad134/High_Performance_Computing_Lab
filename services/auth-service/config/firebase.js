const { initializeApp, cert } = require("firebase-admin/app");

let serviceAccount;

if (process.env.FB_SERVICE_KEY) {
    const decoded = Buffer
        .from(process.env.FB_SERVICE_KEY, "base64")
        .toString("utf8");

    serviceAccount = JSON.parse(decoded);
} else {
    serviceAccount = require("../hpclab-firebase-adminsdk.json");
}

const app = initializeApp({
    credential: cert(serviceAccount),
});

module.exports = app;