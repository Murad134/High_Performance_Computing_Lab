require("dotenv").config();

const app = require("../app");
const { connectToDb } = require("../config/db");

let isDbConnected = false;

module.exports = async (req, res) => {
	if (!isDbConnected) {
		await connectToDb();
		isDbConnected = true;
	}

	return app(req, res);
};
