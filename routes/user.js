var express = require('express');
var router = express.Router();
const { DatabaseService } = require('../services/DatabaseService');
const AuthService = require("../services/AuthService")

//Login
router.post("/login", (req, res) => {
  if(!req.body.username || !req.body.password) {
    res.status(400).send("Missing username or password in body");
  }

  AuthService.getToken(req.body.code, req.body.redirect_url).then((data) => {
    res.status(200).send(data);
  }).catch(error => {
    res.status(400).send("Failed to authenticate with code: " + req.body.code);
  })
  

});

//register
router.post("/", (req, res) => {
  if(!req.body.username || !req.body.password) {
    res.status(400).send("Missing username or password in body");
  }

  DatabaseService.instance().insertNewUser(req.body.username, req.body.password)
  AuthService.loginWithCredentials(req.body.username, req.body.password)

  AuthService.getToken(req.body.code, req.body.redirect_url).then((data) => {
    res.status(200).send(data);
  }).catch(error => {
    res.status(400).send("Failed to authenticate with code: " + req.body.code);
  })
  
});

module.exports = router;