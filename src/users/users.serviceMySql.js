const Config = require('../config')
const Model = require('./users.modelMySql')
const Messages = require('./users.messages')
const Services = require('../servicesMySql')
const Methods = require('../methods')
const Utils = require('../utils')

module.exports = {
    loginUser,
    createUser,
    getUsers,
    getUser,
    updateUser,
    updateUserPassword,
    deleteUser,
    resetPasswordRequest,
    resetPassword,
    Model,
    Messages
}

async function loginUser(data) {
    try {

        const user = await Model.findOne({
            where: { email: data.email },
            attributes: ['id', 'password'],
        });

        if(!user)
            throw new Messages(data).userNotFound

        if(!Methods.bcryptCompare(data.password, user.password))
            throw new Messages(data).userPasswordError

        return await Services.Sessions.createSession({userId: user.id})

    } catch(error) {
        throw error
    }
}

async function createUser(data) {
    try {
       
        const exists = await Model.findOne({ where: { email: data.email } });

        if (exists) {
            return exists;
        }

       
        const user = await Model.create({
            
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
            
        });

       
       

        return user;
    } catch (error) {
        throw error;
    }
}

async function getUsers(query) {
    try {

        const options = {}
        const limit = 100
        const page = query.page

        if(query.find) {
            const regexp = new RegExp(query.find, 'i')
            options.$or = [
                {name: regexp},
                {email: regexp},
                {phone: regexp},
            ]
        }

        const users = await Model.find(options)
            .skip(page * limit)
            .limit(limit)
            .sort({created: -1})

        const total = await Model.countDocuments(options)

        return {
            users,
            metadata: Utils.metadata(page, limit, total, users.length, query),
        }

    } catch(error) {
        throw error
    }
}

async function getUser(userId) {
    try {

        const user = await Model.findOne({_id: userId})

        if(!user)
            throw new Messages(userId).userNotFound

        return user

    } catch(error) {
        throw error
    }
}

async function updateUser(userId, data) {
    try {

        const user = await getUser(userId)
        const keys = Object.keys(data)

        keys.forEach(key => {
            user[key] = data[key]
        })

        return await user.save()

    } catch(error) {
        throw error
    }
}

async function updateUserPassword(userId, data) {
    try {

        const user = await Model.findOne({_id: userId}, '+password')
        
        user.password = data.password

        return await user.save()

    } catch(error) {
        throw error
    }
}

async function deleteUser(userId) {
    try {

        await getUser(userId)
        await Model.deleteOne({_id: userId})

        return userId

    } catch(error) {
        throw error
    }
}

async function resetPasswordRequest(email) {
    try {

        const user = await Model.findOne({email: email})

        if(!user)
            throw new Messages(email).userNotFound

            return await Services.SendGrid.sendEmailResetPassword(user)

    } catch(error) {
        throw error
    }
}

async function resetPassword(data) {
    try {

        const userId = Methods.stringDecrypt(data.token, Config.saltDecryptToken)

        await updateUserPassword(userId, data)

        return await Services.Sessions.createSession({userId: userId})

    } catch(error) {
        throw error
    }
}
