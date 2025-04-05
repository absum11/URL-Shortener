const express = require("express");
const v1Router = require("./v1");
const { urlRedirectController } = require("../controllers/url.controller");

const router = express.Router();

router.use("/v1", v1Router);

// get original from shortened url requested
router.get("/:id", urlRedirectController);

module.exports = router;
