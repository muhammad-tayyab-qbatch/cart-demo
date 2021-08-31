const jwt = require("jsonwebtoken");
const TOKEN_KEY = 'XjgPUoJWXV';

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const tokenArray = token.split(" ");
    
    if(tokenArray && tokenArray[0].toLowerCase() === 'bearer'){
      const decoded = jwt.verify(tokenArray[1], TOKEN_KEY);
      console.log('decoded ',  decoded);
      req.user = decoded;
    }else{
      return res.status(401).send('unauthorized');
    }
    
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;