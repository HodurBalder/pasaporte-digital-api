const Fields = require('./codes.fields')
const Service = require('./codes.service.mysql')

module.exports = {
    createCode,
    getCodes,
    getCode,
    updateCode,
    deleteCode,
    generateCodes
}

async function createCode(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
        }

        response.$data(await Service.createCode(data))

    } catch(error) {
        response.$error(error)
    }
}

async function getCodes(request, response) {
    try {

        const query = {
            page: parseInt(request.query.page || 0),
            find: request.query.find
        }

        response.$data(await Service.getCodes(query))

    } catch(error) {
        response.$error(error)
    }
}

async function getCode(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            codeId: fields.codeId.get()
        }

        response.$data(await Service.getCode(data.codeId))

    } catch(error) {
        response.$error(error)
    }
}

async function updateCode(request, response) {
    try {

        const fields = new Fields(request)

        let data = {
            codeId: fields.codeId.get()
        }

        const props = [
        ]

        props.forEach(prop => request.body[prop] != undefined && (data[prop] = fields[prop].get()))

        response.$data(await Service.updateCode(data.codeId, data))

    } catch(error) {
        response.$error(error)
    }
}

async function deleteCode(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            codeId: fields.codeId.get()
        }

        response.$data(await Service.deleteCode(data.codeId))

    } catch(error) {
        response.$error(error)
    }
}

async function generateCodes(request, response) {
    try {

        response.$file(await Service.generateCodes())

    } catch(error) {
        response.$error(error)
    }
}
