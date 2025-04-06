const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyTokenOptional = (req, res, next) => {
  const token = req.cookies?.authToken;

  if (!token) {
    return next(); // Proceed as guest
  }

  jwt.verify(token, config.server.jwt.secret, (err, decoded) => {
    if (err) {
      return next(); // Invalid token, treat as guest
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyTokenOptional;
