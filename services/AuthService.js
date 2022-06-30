const bcrypt = require("bcrypt")
const DatabaseService = require('./DatabaseService');
require('dotenv').config();

const loginWithCredentials = async(playername, password) => {
    const player = await DatabaseService.instance().getPlayer(playername)
    if(!player) return null

    const passwordMatch = await bcrypt.compare(password, player.password)
    if(!passwordMatch) return null
    
    const authToken = await DatabaseService.instance().insertNewAuthToken(player.playername)
    return authToken
}

const checkIfAuthTokenValid = async(authToken) => {
    const token = await DatabaseService.instance().getAuthToken(authToken)
    if(!token) return false
    return true
}

module.exports.loginWithCredentials = loginWithCredentials
module.exports.checkIfAuthTokenValid = checkIfAuthTokenValid