const bcrypt = require("bcrypt")
const { DatabaseService } = require('./DatabaseService');
require('dotenv').config();

const loginWithCredentials = (username, password) => {
    const user = DatabaseService.instance().getUser(username)
    if(!user) return

    bcrypt.compare(password, user.password, (err, result) => {
        if (!result) {
           // password is invalid
           return
        }
    });
    
    const authToken = DatabaseService.instance().insertNewAuthToken(user.id)
    return authToken
}

const checkIfAuthTokenValid = (authToken) => {
    const token = DatabaseService.instance().getAuthToken(authToken)
    if(!token) return false
    return true
}

module.exports.loginWithCredentials = loginWithCredentials
module.exports.checkIfAuthTokenValid = checkIfAuthTokenValid