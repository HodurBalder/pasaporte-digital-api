const Router = require('express').Router()
const Hub = require('./users.hub')
const Middlewares = require('../middlewares')

Router.post('/users/login', Hub.loginUser)

Router.post('/users', Hub.createUser)

Router.get('/users/:userId', Middlewares.auth, Hub.getUser)

Router.get('/users', Middlewares.auth, Hub.getUsers)

Router.put('/users/:userId', Middlewares.auth, Hub.updateUser)

Router.put('/users/:userId/password', Middlewares.auth, Hub.updateUserPassword)

Router.delete('/users/:userId', Middlewares.auth, Hub.deleteUser)

Router.get('/users/resetPasswordRequest/:email', Hub.resetPasswordRequest)

Router.put('/users/resetPasswordRequest/:email', Hub.resetPassword)

Router.post('/users/checkCode/:email', Hub.checkCode)

module.exports = Router