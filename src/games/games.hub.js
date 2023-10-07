const Fields = require('./games.fields')
const Service = require('./games.service.mysql')

module.exports = {
    createGame,
    getGames,
    getGame,
    updateGame,
    deleteGame,
    getGamesByUser
}

async function createGame(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            userId: request.userId,
            gameName: fields.gameName.get(),
            score: fields.score.get(),
            level: fields.level.get(),
            completed: fields.completed.get(),
            additionalData: fields.additionalData.get(),
        }

        response.$data(await Service.createGame(data))

    } catch(error) {
        response.$error(error)
    }
}

async function getGames(request, response) {
    try {

        const query = {
            page: parseInt(request.query.page || 0),
            find: request.query.find
        }

        response.$data(await Service.getGames(query))

    } catch(error) {
        response.$error(error)
    }
}

async function getGame(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            gameId: fields.gameId.get()
        }

        response.$data(await Service.getGame(data.gameId))

    } catch(error) {
        response.$error(error)
    }
}

async function updateGame(request, response) {
    try {

        const fields = new Fields(request)

        let data = {
            gameId: fields.gameId.get()
        }

        const props = [
            'playCount',
            'score',
            'level',
            'completed',
            'additionalData',
        ]

        props.forEach(prop => request.body[prop] != undefined && (data[prop] = fields[prop].get()))

        response.$data(await Service.updateGame(data.gameId, data))

    } catch(error) {
        response.$error(error)
    }
}

async function deleteGame(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            gameId: fields.gameId.get()
        }

        response.$data(await Service.deleteGame(data.gameId))

    } catch(error) {
        response.$error(error)
    }
}

async function getGamesByUser(request, response) {
    try {

        response.$data(await Service.getGamesByUser(request.userId))

    } catch(error) {
        response.$error(error)
    }
}