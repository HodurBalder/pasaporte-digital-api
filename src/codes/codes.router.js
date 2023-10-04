const Router = require('express').Router()
const Hub = require('./codes.hub')
const Middlewares = require('../middlewares')

Router.post('/codes', Middlewares.auth, Hub.createCode)

Router.get('/codes/:codeId', Middlewares.auth, Hub.getCode)

Router.get('/codes', Middlewares.auth, Hub.getCodes)

Router.put('/codes/:codeId', Middlewares.auth, Hub.updateCode)

Router.delete('/codes/:codeId', Middlewares.auth, Hub.deleteCode)

Router.get('/generateCodes', Middlewares.auth, Hub.generateCodes)

module.exports = Router