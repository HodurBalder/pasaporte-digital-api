const superagent = require('superagent')
const Config = require('./config')

module.exports = {
    createUser,
    updateUser,
}

async function createUser(user) {
    try {

        const datos = {
            a1: "registrar",
            llave: Config.siga.llave,
            uuid: user.uuid,
            role: user.role,
            name: user.name,
            lastname: user.lastName ?? '',
            email: user.email,
            phone: user.phone,
        }

        const response = await superagent
            .post('https://www.icursos.mx/bbva/enlaces/x23/?a1=registrar')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(datos)

        return response.text

    } catch (error) {
        console.log('error SIGA', error)
        throw error
    }
}

async function updateUser(data) {
    try {
        const response = await superagent
            .post(Config.siga.url)
            .set('Authorization', `Bearer ${token}`)
            .send(datos)

        console.log('response SIGA', response)
        return response.body

    } catch (error) {
        console.log('error SIGA', error)
        throw error
    }
}