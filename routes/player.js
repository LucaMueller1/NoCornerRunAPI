var express = require('express');
var router = express.Router();
const DatabaseService = require('../services/DatabaseService');

//get player and his highscore etc
router.get("/", async(req, res) => {
  const authToken = req.header("Authorization")

  const player = await DatabaseService.instance().getPlayerByAuthToken(authToken)
  if(player != null) {
    res.status(200).send({ playername: player.playername, highscore: player.highscore, knowledge: player.knowledge })
  } else {
    res.status(403).send()
  }

});

//update players highscore, knowledge etc
router.put("/", async(req, res) => {
  const authToken = req.header("Authorization")

  if(req.body.highscore == null || req.body.knowledge == null) {
    res.status(400).send("Missing highscore or knowledge in body to update player")
    return
  }

  let player = await DatabaseService.instance().getPlayerByAuthToken(authToken)
  if(player == null) {
    res.status(400).send("Failed to update player")
    return
  }

  DatabaseService.instance().updatePlayer(player.playername, req.body.highscore, req.body.knowledge).then(() => {
    res.status(200).send();
  }).catch(error => {
    console.log(error)
    res.status(400).send("Failed to update player")
  })
});

//get player skins
router.get("/skins", async(req, res) => {
  const authToken = req.header("Authorization")

  const player = await DatabaseService.instance().getPlayerByAuthToken(authToken)
  if(player == null) {
    res.status(400).send("Failed to get player")
    return
  }

  const skinIds = await DatabaseService.instance().getUnlockedSkinsByPlayer(player.playername)
  res.status(200).send(skinIds)
});

module.exports = router;