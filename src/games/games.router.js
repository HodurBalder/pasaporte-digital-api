const Router = require('express').Router()
const Hub = require('./games.hub')
const Middlewares = require('../middlewares')

Router.post('/games', Middlewares.auth, Hub.createGame)

Router.get('/games/:gameId', Middlewares.auth, Hub.getGame)

Router.get('/getGamesByUser', Middlewares.auth, Hub.getGamesByUser)

Router.get('/games', Middlewares.auth, Hub.getGames)

Router.put('/games/:gameId', Middlewares.auth, Hub.updateGame)

Router.delete('/games/:gameId', Middlewares.auth, Hub.deleteGame)

module.exports = Router