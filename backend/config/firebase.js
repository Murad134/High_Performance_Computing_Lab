var admin = require("firebase-admin");

var serviceAccount = require("../hpclab-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});