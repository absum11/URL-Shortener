const express = require("express");
const router = require("./router");
const cors = require("cors");
const config = require("./config");
const connectMongo = require("./database/mongodb"); // import mongodb connection

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

//enable cors for all origins
if (config.cors.enabled) {
	app.use(
		cors({
			origin: config.cors.origin,
			methods: config.cors.methods,
			allowedHeaders: config.cors.headers,
			credentials: config.cors.credentials
		})
	);
}

// connect to mongo
connectMongo();

app.use("/", router);

module.exports = app;
