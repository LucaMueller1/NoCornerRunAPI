require('dotenv').config();
const authService = require("../services/AuthenticationService")

async function intercept(req, res, next) {
    if(!req.header("Authorization")) {
        res.status(401).send("Authorization header required");
    } else {
        authService.introspect(req.header("Authorization")).then(data => {
            if(data.active) {   //token still valid/active
                next();
            } else {
                res.status(401).send("Authorization failed");
            }
        }).catch(error => {
            console.log(error)
            res.status(401).send("Authorization failed");
        })
    }
}

module.exports.intercept = intercept;