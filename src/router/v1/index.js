const express = require("express");
const urlRouter = require("../urls.router");
const userRouter = require("../user.router");
const {
	newUserController,
	loginController,
} = require("../../controllers/auth.controller");
const { urlRedirectController } = require("../../controllers/url.controller");
const verifyTokenOptional = require("../../middlewares/verifyTokenOptional.middleware");
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

// protected routes for user
v1Router.use("/user", userRouter);

// public
v1Router.use("/shorten", verifyTokenOptional ,urlRouter);
// get source from shortened url requested
v1Router.get("/:id", urlRedirectController);

module.exports = v1Router;
