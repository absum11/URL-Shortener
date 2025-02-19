const mongoose = require("mongoose");
const { mongodb: mongoConfig } = require("../../config");

const mongo_uri = `mongodb://${mongoConfig.mongodb.host}:${mongoConfig.mongodb.port}/${mongoConfig.mongodb.database}`;

mongoose.connect(mongo_uri)
	.then(() => console.log("connected to MongoDB"))
	.then((err) => console.error("connection error", err));
