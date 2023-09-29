const Services = require('./services')
const Messages = require('./messages')
const Config = require('./config')

module.exports = {
    auth,
    serverError,
    serverNotFound,
    responseType
}

async function auth(request, response, next) {
    try {

        const token = request.headers.token
    
        if(!token)
            return response.$error(new Messages().tokenNotFound)
    
        const session = await Services.Sessions.verifySession(token)
    
        request.userId = session.userId
    
        next()

    } catch(error) {
        response.$error(error)
    }
}

async function serverNotFound(request, response) {
    response.$error(new Messages().serverNotFound)
}

async function serverError(error, request, response, next) {
    response.$error(new Messages(error).serverError)
}

async function responseType(request, response, next) {

    response.$data = data => {
        response.status(200).send({
            success: true,
            data
        })
    }

    response.$error = error => {
    
        console.info(`[APP] (ERROR)`)
        console.info(error)
    
        if(!error || !error.code || !error.key)
            error = {
                code: 503,
                key: 'serverUnknow',
                message: 'Error en el servidor',
                $details: error,
                $stack: (error.stack || '').split('\n')
            }
    
        response.status(error.code).send({
            success: false,
            error
        })
    }

    response.$html = html => {
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.status(200).send(html)
    }

    response.$file = data => {
        response.setHeader('Content-Type', data.contentType)
        response.send(data.file)
    }

    response.$redirect = url => {
        response.redirect(url)
    }

    next()
}