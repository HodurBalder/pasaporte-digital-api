module.exports = class Messages {

    constructor($details, $message) {

        this.codeSaveError = {
            code: 503,
            key: 'codeSaveError',
            message: $message || 'Error al guardar la información del codigo',
            $details
        }

        this.codeGetError = {
            code: 503,
            key: 'codeGetError',
            message: $message || 'Error al obtener la información del codigo',
            $details
        }

        this.codeNotFound = {
            code: 404,
            key: 'codeNotFound',
            message: $message || 'El registro del codigo no fue encontrado',
            $details
        }

        this.codeDeleteError = {
            code: 503,
            key: 'codeDeleteError',
            message: $message || 'Error al borrar la información del codigo',
            $details
        }
    }
}