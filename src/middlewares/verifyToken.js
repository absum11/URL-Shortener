const jwt = require("jsonwebtoken");
const config = require("../config");

const validateAuthToken = (req, res, next)=> {
    try {
        const token = req.cookies.authToken;
    
        if (!token) {
          return res.status(401).json({ error: "Access denied. No token present" });
        }
    
        const decoded = jwt.verify(token, config.server.jwt.secret);
    
        // Attach user data to request object
        req.user = decoded;
    
        next();
      } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token." });
      }

};

module.exports = validateAuthToken;