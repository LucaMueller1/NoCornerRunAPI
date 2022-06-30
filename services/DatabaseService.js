const bcrypt = require("bcrypt")
const { Client } = require('pg')

module.exports = class DatabaseService {
    static _instance
    client = null

    constructor() {
        this.initDB()
    }

    async initDB() {
        this.client = new Client()
        await this.client.connect()
    }

    static instance() {
        if(!this._instance) this._instance = new DatabaseService()
        return this._instance
    }

    async insertNewUser(username, password) {
        let passwordHash = null
        bcrypt.hash(password, 10, (err, hash) => {
            passwordHash = hash
        });

        if(passwordHash === null) throw "Hashing of password failed!"

        //insert user
        const user = await this.client.query(`INSERT INTO user(username, password) VALUES('${username}', '${password}')`)
        return user
    }

    async insertNewAuthToken(username) {
        const token = await this.client.query(`INSERT INTO auth_token(username) VALUES('${username}')`)
        return token
    }

    async getUser(username) {
        const user = await this.client.query(`SELECT * FROM user WHERE user.username = '${username}'`)
    }

    async getAuthToken(authToken) {
        const token = await this.client.query(`SELECT * FROM auth_token WHERE auth_token.id = '${authToken}'`)
    }

}
