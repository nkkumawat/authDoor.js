var jwt = require('jsonwebtoken');
var appName, clientSuperSecret, sessionTime;
function getToken(data){
  var token = jwt.sign(data,
    clientSuperSecret,
    {
      expiresIn: sessionTime
    });
  return token;
}

function decodeToken(token){
  var decoded = jwt.verify(token, clientSuperSecret);
  return decoded;
}

module.exports =  {
  init: function(aName, cSuperSecret, sTime = 30*24*60*60) {
    appName = aName;
    clientSuperSecret = cSuperSecret;
    sessionTime = sTime;
    return
  },
  setSession: function(req, res, next){
    var token = getToken(req.sessionData);
    res.cookie(appName, token, { 
      maxAge: sessionTime, 
      httpOnly: true 
    });
    next();
  },

  deleteSession: function(req, res, next){
    res.clearCookie(appName);
    next();
  },

  authenticate: function(req, res, next){
    var decoded = decodeToken(req.cookies[appName]);
    if(decoded != null){
      console.log(decoded , "ml")
      req.decoded = decoded;
    } else {
      req.authError = true;
    }
    next();
  },

}