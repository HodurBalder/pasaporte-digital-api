const Model = require('./codes.model.mysql')
const Messages = require('./codes.messages')
const Services = require('../servicesMySql')
const Utils = require('../utils')
const Methods = require('../methods')

module.exports = {
    createCode,
    getCodes,
    getCode,
    updateCode,
    deleteCode,
    generateCodes,
    Model,
    Messages
}

async function createCode(data) {
    try {

        const code = await Model.create(data)

        return code

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

async function generateCodes() {
    
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const gameNames = ['tiktok', 'sesgosCognitivos', 'quizzFinanciero', 'quizzFinal', 'laberintoWeb', 'laberintoVR']
    const codes = []
    const codesPerGame = 100
    let code

    do {
        code = ''
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            code += characters[randomIndex]
        }

        if(!codes.includes(code))
            codes.push(code)

    } while (codes.length < (codesPerGame * gameNames.length))

    const result = [].concat(...gameNames.map((gameName, index) => {
        const startIndex = index * codesPerGame
        const endIndex = startIndex + codesPerGame;

        const gameCodes = codes.slice(startIndex, endIndex).map((code) => ({
        gameName,
        code,
        }))
    
        return gameCodes
    }))

    console.log(result)
    return Methods.jsonxls(result);

}