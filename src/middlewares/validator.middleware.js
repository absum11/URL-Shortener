const {
  isValidURL,
  isBlackListedDomain,
} = require("../utils/validation.utils");

const validateUrlMiddleware = (req, res, next) => {
  if (isValidURL(req.body.url)) {
    return next();
  }

  return res.status(400).json({
    msg: "please enter a valid url",
  });
};

const blacklistedDomainMiddleware = (req, res, next) => {
  if (isBlackListedDomain(req.body.url)) {
    return res.status(403).json({
      msg: "This domain is not allowed.",
    });
  }
  return next();
};

module.exports = {
  validateUrlMiddleware,
  blacklistedDomainMiddleware,
};
