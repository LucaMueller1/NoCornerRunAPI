const bcrypt = require("bcrypt")
const uuid = require('uuid');
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

    async insertNewPlayer(playername, password) {
        const hash = await bcrypt.hash(password, 10)

        if(hash === null) return

        //insert player
        await this.client.query(`INSERT INTO player(playername, password, highscore, knowledge) VALUES('${playername}', '${hash}', 0, 0)`)
    }

    async insertNewAuthToken(playername) {
        const authId = uuid.v4()
        await this.client.query(`INSERT INTO auth_token(id, playername) VALUES('${authId}', '${playername}')`)
        return authId
    }

    async getPlayer(playername) {
        const player = await this.client.query(`SELECT * FROM player WHERE player.playername = '${playername}'`)
        return player.rows[0]
    }

    async updatePlayer(playername, highscore, knowledge) {
        await this.client.query(`UPDATE player SET highscore = ${highscore}, knowledge = ${knowledge} WHERE player.playername = '${playername}'`)
    }

    async getPlayerByAuthToken(authToken) {
        const token = await this.getAuthToken(authToken)
        if(token == null) return null
        const player = await this.client.query(`SELECT * FROM player WHERE player.playername = '${token.playername}'`)
        return player.rows[0]
    }

    async getAuthToken(authToken) {
        const token = await this.client.query(`SELECT * FROM auth_token WHERE auth_token.id = '${authToken}'`)
        return token.rows[0]
    }

    async getLeaderboard() {
        const players = await this.client.query(`SELECT playername, highscore FROM player ORDER BY player.highscore DESC LIMIT 100`)
        return players.rows
    }

}
