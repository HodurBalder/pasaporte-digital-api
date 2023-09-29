const Model = require('./codes.model')
const Messages = require('./codes.messages')
const Services = require('../services')
const Utils = require('../utils')

module.exports = {
    createCode,
    getCodes,
    getCode,
    updateCode,
    deleteCode,
    Model,
    Messages
}

async function createCode(data) {
    try {

        const code = new Model(data)

        return await code.save()

    } catch(error) {
        throw error
    }
}

async function getCodes(query) {
    try {

        const options = {}
        const limit = 100
        const page = query.page

        if(query.find) {
            const regexp = new RegExp(query.find, 'i')
            options.$or = []
        }

        const codes = await Model.find(options)
            .skip(page * limit)
            .limit(limit)
            .sort({created: -1})

        const total = await Model.countDocuments(options)

        return {
            codes,
            metadata: Utils.metadata(page, limit, total, codes.length, query),
        }

    } catch(error) {
        throw error
    }
}

async function getCode(codeId) {
    try {

        const code = await Model.findOne({_id: codeId})

        if(!code)
            throw new Messages(codeId).codeNotFound

        return code

    } catch(error) {
        throw error
    }
}

async function updateCode(codeId, data) {
    try {

        const code = await getCode(codeId)
        const keys = Object.keys(data)

        keys.forEach(key => {
            code[key] = data[key]
        })

        return await code.save()

    } catch(error) {
        throw error
    }
}

async function deleteCode(codeId) {
    try {

        await getCode(codeId)
        await Model.deleteOne({_id: codeId})

        return codeId

    } catch(error) {
        throw error
    }
}