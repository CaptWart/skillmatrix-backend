const jwt = require('jsonwebtoken');

var dotenv = require('dotenv');
dotenv.config();

const auth = function(req, res, next) {

  const cookieHead = req.headers.cookie;
  const cookie = req.query.token;
  let token = "";
  if(cookieHead){
    token = cookieHead.substring(6,cookieHead.length);
  }
  else{
    token = cookie;
  }
  
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, process.env.jwtsecret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
        
      } else {
        req.userid = decoded.userid;
        req.email = decoded.email;
        req.id = decoded.id;
        next();
      }
    });
  }
}

module.exports = auth;
