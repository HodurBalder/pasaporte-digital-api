const superagent = require('superagent')
const Config = require('./config')

module.exports = {
    createUser,
    updateGame,
}

async function createUser(user) {
    try {

        const datos = {
            a1: "registrar",
            llave: Config.siga.llaveCreate,
            uuid: user.uuid,
            role: user.role,
            name: user.name,
            lastname: user.lastName ?? '',
            email: user.email,
            phone: user.phone,
        }

        const response = await superagent
            .post(`${Config.siga.url}/?a1=registrar`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(datos)

        return response.text

    } catch (error) {
        console.log('error SIGA', error)
        throw error
    }
}

async function updateGame(userUuid, game) {
    try {

        const datos = {
            a1: "avances",
            llave: Config.siga.llaveUpdate,
            uuid: userUuid,
            quizzfinanzas: (game.gameName === 'quizzfinanzas' && game.completed === true) ? 1 : '',
            laberintodigital: (game.gameName === 'laberintodigital' && game.completed === true) ? 1 : '',
            sesgos: (game.gameName === 'sesgos' && game.completed === true) ? 1 : '',
            tiktokfinanzas: (game.gameName === 'tiktokfinanzas' && game.completed === true) ? 1 : '',
            quizzar: (game.gameName === 'quizzar' && game.completed === true) ? 1 : '',
            conferencias: (game.gameName === 'conferencias' && game.completed === true) ? 1 : '',
            photoboot: (game.gameName === 'photoboot' && game.completed === true) ? 1 : '',
            extra: (game.gameName === 'extra' && game.completed === true) ? 1 : '',
        }

        const response = await superagent
            .post(`${Config.siga.url}/?a1=avances`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(datos)

        return response.text

    } catch (error) {
        console.log('error SIGA', error)
        throw error
    }
}