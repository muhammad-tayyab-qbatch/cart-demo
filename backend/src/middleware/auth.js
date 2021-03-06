const jwt = require("jsonwebtoken");
const TOKEN_KEY = 'XjgPUoJWXV';

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const tokenArray = token.split(" ");

    if (tokenArray && tokenArray[0].toLowerCase() === 'bearer') {

      if (tokenArray[1].length > 10) {
        const decoded = jwt.verify(tokenArray[1], TOKEN_KEY);
        req.user = { token: tokenArray[1], email: decoded.email };
      }
      else if (tokenArray[1].length === 10) {
        req.user = { email: tokenArray[1] };
      }
    }
    else {
      return res.status(401).send('Unauthorized');
    }

  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

module.exports = verifyToken;