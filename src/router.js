const Router = require('express').Router()

Router.get('/', (request, response) => {
    response.status(200).send({
        succes: true,
        data: {
            autor: 'github@hodurbalder',
            email: 'hodurbalder@gmail.com',
            message: 'NodeJS API'
        }
    })
})

module.exports = [
    Router,
    require('./sessions/sessions.router'),
    require('./users/users.router'),
    require('./games/games.router'),
]