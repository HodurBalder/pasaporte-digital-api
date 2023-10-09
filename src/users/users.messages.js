module.exports = class Messages {

    constructor($details, $message) {

        this.userSaveError = {
            code: 503,
            key: 'userSaveError',
            message: $message || 'Error al guardar la información del usuario',
            $details
        }

        this.userGetError = {
            code: 503,
            key: 'userGetError',
            message: $message || 'Error al obtener la información del usuario',
            $details
        }

        this.userNotFound = {
            code: 404,
            key: 'userNotFound',
            message: $message || 'El registro del usuario no fue encontrado',
            $details
        }

        this.userExist = {
            code: 409,
            key: 'userExist',
            message: $message || 'El email ya se encuentra registrado. Por favor inicie sesión.',
            $details
        }

        this.userDeleteError = {
            code: 503,
            key: 'userDeleteError',
            message: $message || 'Error al borrar la información del usuario',
            $details
        }

        this.userPasswordError = {
            code: 400,
            key: 'userPasswordError',
            message: $message || 'La contraseña es incorrecta',
            $details
        }
    }
}