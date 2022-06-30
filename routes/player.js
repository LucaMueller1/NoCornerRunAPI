var express = require('express');
var router = express.Router();
const DatabaseService = require('../services/DatabaseService');

//get player and his highscore etc
router.get("/", (req, res) => {
  const authToken = req.header("Authorization")

  DatabaseService.instance().getplayerByAuthToken(authToken).then(player => {
    res.status(200).send(player);
  }).catch(error => {
    console.log(error)
    res.status(400).send("Failed to fetch player");
  })

});

//update players highscore, knowledge etc
router.put("/", (req, res) => {
  const authToken = req.header("Authorization")
  let player = null;

  if(!req.body.highscore || !req.body.knowledge) {
    res.status(400).send("Missing highscore or knowledge in body to update player");
  }

  DatabaseService.instance().getplayerByAuthToken(authToken).then(data => {
    player = data
  }).catch(error => {
    console.log(error)
    res.status(400).send("Failed to update player");
  })

  if(player == null) res.status(400).send("Failed to update player");

  DatabaseService.instance().updateplayer(req.body.highscore, req.body.knowledge, player.playername).then(() => {
    res.status(200).send();
  })
});

module.exports = router;