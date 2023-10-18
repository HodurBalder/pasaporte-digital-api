const Config = require('../config')
const Model = require('./users.model')
const Messages = require('./users.messages')
const Services = require('../services')
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
    checkCode,
    loginGoogle,
    Model,
    Messages
}

async function loginUser(data) {
    try {

        const user = await Model.findOne({email: data.email}, '+password')

        if(!user)
            throw new Messages(data).userNotFound

        if(!Methods.bcryptCompare(data.password, user.password))
            throw new Messages(data).userPasswordError

        return await Services.Sessions.createSession({userId: user._id})

    } catch(error) {
        throw error
    }
}

async function createUser(data) {
    try {

        const exists = await Model.findOne({email: data.email})

        if(exists)
            throw new Messages(data.email).userExist

        const user = new Model(data)

        await user.save()

        dataSession = await Services.Sessions.createSession({userId: user._id})
        const statusSiga = await Services.Siga.createUser(dataSession.user)
        console.log('status siga', statusSiga)

        return dataSession

    } catch(error) {
        throw error
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
        user.codeResetPassword = generateCode()

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
            throw new Messages(user).userNotFound

        user.codeResetPassword = generateCode() 
        await user.save()

        return await Services.SendGrid.sendEmailResetPassword(user)

    } catch(error) {
        throw error
    }
}

async function resetPassword(data) {
    try {

        const user = await Model.findOne({email: data.email}, '+codeResetPassword')
        
        if(!user)
            throw new Messages(data.email).userNotFound
        
        if(user.codeResetPassword !== data.code)
            throw new Messages(data.code).userCodeError

        await updateUserPassword(user._id, data)

        return await Services.Sessions.createSession({userId: user._id})

    } catch(error) {
        throw error
    }
}

async function checkCode(data) {
    try {

        const user = await Model.findOne({email: data.email}, '+codeResetPassword')
        
        if(!user)
            throw new Messages(data.email).userNotFound

        if(user.codeResetPassword !== data.code)
            throw new Messages(data.code).userCodeError

        return {
            message: "El código es válido, puede continuar.",
            code: data.code
        }

    } catch(error) {
        throw error
    }
}

async function loginGoogle(jwt){
    const dataGoogle = await Services.oauthGoogle.getDecodedOAuthJwtGoogle(jwt)
    console.log('dataGoogle', dataGoogle)

    return dataGoogle
}

function generateCode(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''

    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        code += characters[randomIndex]
    }

    return code
}