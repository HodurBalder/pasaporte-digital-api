const Validator = require('../validator')

module.exports = class Fields {

    constructor(request) {

        this.props = {
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
        }

        this.gameId = new Validator({
            type: 'objectId',
            name: 'identificador del juego',
            prop: 'gameId',
            value: this.props.gameId,
        })

        this.userId = new Validator({
            type: 'objectId',
            name: 'identificador del usuario',
            prop: 'userId',
            value: this.props.userId,
        })

        this.gameName = new Validator({
            type: 'string',
            name: 'nombre del juego',
            prop: 'gameName',
            enum: ['quizzfinanzas','laberintodigital','sesgos','tiktokfinanzas','quizzar','conferencias','photoboot','extra'],
            value: this.props.gameName,
            required: true
        })
        
        this.playCount = new Validator({
            type: 'integer',
            name: 'veces jugadas',
            prop: 'playCount',
            value: this.props.playCount,
            required: false
        })

        this.score = new Validator({
            type: 'integer',
            name: 'puntaje',
            prop: 'score',
            value: this.props.score,
            required: false
        })

        this.level = new Validator({
            type: 'string',
            name: 'nivel',
            prop: 'level',
            value: this.props.level,
            required: false
        })

        this.completed = new Validator({
            type: 'boolean',
            name: 'juego completado',
            prop: 'completed',
            value: this.props.completed,
            required: false
        })

        this.additionalData = new Validator({
            type: 'object',
            name: 'datos adicionales',
            prop: 'additionalData',
            value: this.props.additionalData,
            required: false
        })

    }
}