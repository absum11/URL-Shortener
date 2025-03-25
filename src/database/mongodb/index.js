const mongoose = require("mongoose");
const { mongodb: mongoConfig } = require("../../config");

const mongo_uri = `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`;

const connectMongo = async () => {
	try {
		console.log("attempting to connect to: ", mongo_uri);
		await mongoose.connect(mongo_uri);
		console.log("connected to MongoDB");
	} catch (error) {
		console.error("mongo connection error", error);
		process.exit(1); // forces app to stop if connecion refused or a retry logic can be used
	}
};

module.exports = connectMongo;
