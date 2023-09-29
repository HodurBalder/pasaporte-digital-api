const Model = require('./games.model')
const Messages = require('./games.messages')
const Services = require('../services')
const Utils = require('../utils')

module.exports = {
    createGame,
    getGames,
    getGame,
    updateGame,
    deleteGame,
    getGamesByUser,
    Model,
    Messages
}

async function createGame(data) {
    try {

        const exists = await Model.findOne({ userId: data.userId, gameName: data.gameName })

        if (exists)
            return exists

        const game = new Model(data)
        console.log(game)
        return await game.save()

    } catch(error) {
        throw error
    }
}

async function getGames(query) {
    try {

        const options = {}
        const limit = 100
        const page = query.page

        if(query.find) {
            const regexp = new RegExp(query.find, 'i')
            options.$or = [
                {userId: regexp},
            ]
        }

        const games = await Model.find(options)
            .skip(page * limit)
            .limit(limit)
            .sort({created: -1})

        const total = await Model.countDocuments(options)

        return {
            games,
            metadata: Utils.metadata(page, limit, total, games.length, query),
        }

    } catch(error) {
        throw error
    }
}

async function getGame(gameId) {
    try {

        const game = await Model.findOne({_id: gameId})

        if(!game)
            throw new Messages(gameId).gameNotFound

        return game

    } catch(error) {
        throw error
    }
}

async function updateGame(gameId, data) {
    try {

        const game = await getGame(gameId)
        const keys = Object.keys(data)

        keys.forEach(key => {
            game[key] = data[key]
        })

        return await game.save()

    } catch(error) {
        throw error
    }
}

async function deleteGame(gameId) {
    try {

        await getGame(gameId)
        await Model.deleteOne({_id: gameId})

        return gameId

    } catch(error) {
        throw error
    }
}

async function getGamesByUser(userId) {
    try {

        const games = await Model.find({userId: userId})

        console.log(games)
        if(!games)
            throw new Messages(gameId).gameNotFound

        return games

    } catch(error) {
        throw error
    }
}