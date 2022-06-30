var express = require('express');
var router = express.Router();
const DatabaseService = require('../services/DatabaseService');
const AuthService = require("../services/AuthService")

//Login
router.post("/login", async(req, res) => {
  if(!req.body.playername || !req.body.password) {
    res.status(400).send("Missing playername or password in body");
  }

  const token = await AuthService.loginWithCredentials(req.body.playername, req.body.password)

  if(token != null) {
    res.status(200).send({token: token});
  } else {
    res.status(400).send("Wrong username or password");
  }

});

//register
router.post("/", async(req, res) => {
  if(!req.body.playername || !req.body.password) {
    res.status(400).send("Missing playername or password in body");
  }

  const player = await DatabaseService.instance().getPlayer(req.body.playername)
  if(player != null) {
    res.status(400).send("Player already exists");
    return
  }

  await DatabaseService.instance().insertNewPlayer(req.body.playername, req.body.password)
  const token = await AuthService.loginWithCredentials(req.body.playername, req.body.password)

  if(token != null) {
    res.status(200).send({token: token});
  } else {
    res.status(400).send("Failed to register");
  }
  
});

module.exports = router;