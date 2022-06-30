require('dotenv').config();
const AuthService = require("../services/AuthService")

async function intercept(req, res, next) {
    if(!req.header("Authorization")) {
        res.status(401).send("Authorization header required");
    } else {
        const authTokenValid = AuthService.checkIfAuthTokenValid(req.header("Authorization"))
        if(authTokenValid) {
            next(); // token is valid, forward request to router
        } else {
            res.status(401).send("Authorization failed"); // token is invalid, send HTTP 401
        }
    }
}

module.exports.intercept = intercept;