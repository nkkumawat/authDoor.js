##  auth-door
#### Example
```js
const express = require('express');
const authDoor = require('../index');
var cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

authDoor.init("MyAppName", "appSuperSecret", 2*12*60*60 /*session time default is 30 days*/);
app.get('/login', function (req, res, next) {
    req.sessionData = {username: "Narendra Kumawat"}
    next();
  }, authDoor.setSession, 
  function (req, res) {
    return res.send('Logged-IN')
});
app.get('/',  authDoor.authenticate ,function (req, res) {
  if(req.authFailed){
    return res.send("Auth Failed")
  } else {
    return res.send("Auth Success, Welcome : " + req.decoded.username);
  }
});
app.get('/logout',authDoor.deleteSession, function (req, res) {
  return res.send('Logged-OUT')
});
app.listen(3000);
console.log("server stared on 3000")
``` 
