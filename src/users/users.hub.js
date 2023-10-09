const Fields = require('./users.fields')
const Service = require('./users.service')

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
    checkCode
}

async function loginUser(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            email: fields.email.get(),
            password: fields.password.get()
        }

        response.$data(await Service.loginUser(data))

    } catch(error) {
        response.$error(error)
    }
}

async function createUser(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            name: fields.name.get(),
            email: fields.email.get(),
            password: fields.password.get(),
            phone: fields.phone.get(),
        }

        response.$data(await Service.createUser(data))

    } catch(error) {
        response.$error(error)
    }
}

async function getUsers(request, response) {
    try {

        const query = {
            page: parseInt(request.query.page || 0),
            find: request.query.find
        }

        response.$data(await Service.getUsers(query))

    } catch(error) {
        response.$error(error)
    }
}

async function getUser(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            userId: fields.userId.get()
        }

        response.$data(await Service.getUser(data.userId))

    } catch(error) {
        response.$error(error)
    }
}

async function updateUser(request, response) {
    try {

        const fields = new Fields(request)

        let data = {
            userId: fields.userId.get()
        }

        const props = [
            // 'role',
            'phone',
            'email',
        ]

        props.forEach(prop => request.body[prop] != undefined && (data[prop] = fields[prop].get()))

        response.$data(await Service.updateUser(data.userId, data))

    } catch(error) {
        response.$error(error)
    }
}

async function updateUserPassword(request, response) {
    try {

        const fields = new Fields(request)

        let data = {
            userId: fields.userId.get(),
            password: fields.password.get(),
        }

        response.$data(await Service.updateUserPassword(data.userId, data))

    } catch(error) {
        response.$error(error)
    }
}

async function deleteUser(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            userId: fields.userId.get()
        }

        response.$data(await Service.deleteUser(data.userId))

    } catch(error) {
        response.$error(error)
    }
}

async function resetPasswordRequest(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            email: fields.email.get()
        }

        response.$data(await Service.resetPasswordRequest(data.email))

    } catch(error) {
        response.$error(error)
    }
}

async function resetPassword(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            email: fields.email.get(),
            code: fields.code.get(),
            password: fields.password.get()
        }

        response.$data(await Service.resetPassword(data))

    } catch(error) {
        response.$error(error)
    }
}

async function checkCode(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            email: fields.email.get(),
            code: fields.code.get(),
        }

        response.$data(await Service.checkCode(data))

    } catch(error) {
        response.$error(error)
    }
}
