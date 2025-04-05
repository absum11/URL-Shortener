const express = require("express");
const urlRouter = require("../urls.router");
const {
	newUserController,
	loginController
} = require("../../controllers/auth.controller");
const v1Router = express.Router();

//health check api
v1Router.get("/health", (req, res) => {
	res.status(200).send({
		uptime: process.uptime(),
		responseTime: process.hrtime(),
		timestamp: Date.now()
	});
});

// auth routes
v1Router.post("/register", newUserController);
v1Router.post("/login", loginController);

v1Router.use("/shorten", urlRouter);

module.exports = v1Router;
