const superagent = require('superagent')
const Config = require('./config')

module.exports = {
    createUser,
    updateUser,
}

async function createUser(user) {
    try {

        const datos = {
            uuid: user.uuid,
            role: user.role,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            quizzfinanzas: false,
            laberintodigital: false,
            sesgos: false,
            tiktokfinanzas: false,
            quizzar: false,
            conferencias: false,
            photoboot: false,
            extra: false,
        }

        const response = await superagent
            .post(Config.urlSiga)
            .set('Authorization', `Bearer ${token}`)
            .send(datos)

        console.log('response SIGA', response)
        return response.body

    } catch (error) {
        console.log('error SIGA', error)
        throw error
    }
}

async function updateUser(data) {
    try {
        const response = await superagent
            .post(Config.urlSiga)
            .set('Authorization', `Bearer ${token}`)
            .send(datos)

        console.log('response SIGA', response)
        return response.body

    } catch (error) {
        console.log('error SIGA', error)
        throw error
    }
}