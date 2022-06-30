var express = require('express');
var router = express.Router();
const DatabaseService = require('../services/DatabaseService');

//get leaderboard
router.get("/", (req, res) => {

  DatabaseService.instance().getLeaderboard().then(players => {
    res.status(200).send(players);
  }).catch(error => {
    console.log(error)
    res.status(400).send("Failed to fetch leaderboard");
  })

});

module.exports = router;