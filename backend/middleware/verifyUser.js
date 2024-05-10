const jwt = require("jsonwebtoken")
const {JSON_WEB_TOKEN_SECRET_KEY} = require("../config/key");

module.exports.authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    jwt.verify(token, JSON_WEB_TOKEN_SECRET_KEY , function(err, decoded)  {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
      console.log(decoded)
      req.user = decoded;
      next();
    });
  }