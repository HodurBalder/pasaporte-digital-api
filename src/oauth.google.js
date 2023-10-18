const { OAuth2Client } = require('google-auth-library')
const Config = require('./config')

module.exports = {
    getDecodedOAuthJwtGoogle
}

async function getDecodedOAuthJwtGoogle(token) {

    try {
        const client = new OAuth2Client(Config.google.clientId)

        return await client.verifyIdToken({
            idToken: token,
            audience: Config.google.clientId,
        })

    } catch (error) {
        return { status: 500, data: error }
    }
}