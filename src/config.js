require('dotenv').config()

module.exports = {
    mongodb: process.env.MONGODB,
    host: process.env.HOST,
    port: process.env.PORT,
    brand: process.env.BRAND,
    salt: process.env.SALT,
    cron: process.env.CRON === 'true',
    app: process.env.APP,
    saltDecryptToken: process.env.SALTDECRYPTTOKEN,

    sendgrid: {
        key: process.env.SENDGRID,
        templates: {
            resetPassword: process.env.TEMPLATERESETPASSWORDSENDGRIDID
        },
        saltResetPassword: process.env.SALTRESETPASSWORD
    },
    siga: {
        url: process.env.URLSIGA,
        llaveCreate: process.env.LLAVE_SIGA,
        llaveUpdate: process.env.LLAVE_SIGA_UPDATE
    },
    google: {
        clientId: process.env.CLIENT_ID_GOOGLE
    }    

}