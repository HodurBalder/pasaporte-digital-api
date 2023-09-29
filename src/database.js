const Mongoose = require('mongoose')
const Services = require('./services')
const Config = require('./config')

module.exports = new Promise((resolve, reject) => {

    Mongoose.set('strictQuery', false)
    Mongoose.connect(Config.mongodb, {})
        .then(async () => {

            console.info(`[MONGODB] (SUCCESS) ${ Config.mongodb }`.magenta)

            const user = await Services.Users.Model.findOne({role: 'admin'})

            if(!user) {
                await Services.Users.createUser({
                    role: 'admin',
                    name: 'Admin',
                    phone: '1234567890',
                    email: `admin@${ Config.brand }.com`,
                    password: 'root',
                })
            }

            resolve()
        })
        .catch(error => {
            console.info(`[MONGODB] (ERROR) ${ Config.mongodb }`.red)
            console.info(error)
            reject()
        })
})