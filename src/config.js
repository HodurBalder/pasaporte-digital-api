require('dotenv').config()

module.exports = {
    mongodb: process.env.MONGODB,
    host: process.env.HOST,
    port: process.env.PORT,
    brand: process.env.BRAND,
    salt: process.env.SALT,
    cron: process.env.CRON === 'true',
    app: process.env.APP,
}