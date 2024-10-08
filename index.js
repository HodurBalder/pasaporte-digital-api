require('colors').enable()

const Express = require('express')
const Compression = require('compression')
const Morgan = require('morgan')
const Cors = require('cors')

const FormData = require('express-form-data')
const Path = require('path')

const Middlewares = require('./src/middlewares')
const Database = require('./src/database')
const Config = require('./src/config')
const Router = require('./src/router')

const App = Express()

App.use(Cors())
App.use(Compression())
App.use(Morgan('dev'))
App.use(Express.static('public'))
App.use(Express.json())
App.use(FormData.parse({uploadDir: Path.join(__dirname, '/temp/'), autoClean: true}))

App.use(Middlewares.responseType)
App.use(Router)
App.use(Middlewares.serverNotFound)
App.use(Middlewares.serverError)

Database.then(() => {
    App.listen(Config.port, () => {
        console.info(`[HOST] ${ Config.host }`.magenta)
        console.info(`[PORT] ${ Config.port }`.magenta)
        console.info(`[TZ] ${ new Date() }`.magenta)
    })
}).catch(() => {
    process.exit(0)
})