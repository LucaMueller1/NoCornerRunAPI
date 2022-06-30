var express = require('express');
var router = express.Router();
const authService = require("../services/AuthenticationService")

//Login
router.post("/", (req, res) => {
  if(!req.body.username || !req.body.password) {
    res.status(400).send("Missing username or password in body");
  }

  authService.getToken(req.body.code, req.body.redirect_url).then((data) => {
    res.status(200).send(data);
  }).catch(error => {
    res.status(400).send("Failed to authenticate with code: " + req.body.code);
  })
  

});

module.exports = router;