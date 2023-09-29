module.exports = class Messages {

    constructor($details, $message) {

        this.gameSaveError = {
            code: 503,
            key: 'gameSaveError',
            message: $message || 'Error al guardar la información del juego',
            $details
        }

        this.gameGetError = {
            code: 503,
            key: 'gameGetError',
            message: $message || 'Error al obtener la información del juego',
            $details
        }

        this.gameNotFound = {
            code: 404,
            key: 'gameNotFound',
            message: $message || 'El registro del juego no fue encontrado',
            $details
        }

        this.gameDeleteError = {
            code: 503,
            key: 'gameDeleteError',
            message: $message || 'Error al borrar la información del juego',
            $details
        }
    }
}