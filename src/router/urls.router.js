const express = require("express");
const { urlShortenController } = require("../controllers");
const {
	validateUrlMiddleware,
	blacklistedDomainMiddleware
} = require("../middlewares/validator.middleware");
const urlRouter = express.Router();

// create short url by reading original from user
urlRouter.post(
	"/",
	validateUrlMiddleware,
	blacklistedDomainMiddleware,
	urlShortenController
);

module.exports = urlRouter;
