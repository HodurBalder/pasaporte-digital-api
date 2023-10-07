const Validator = require('../validator')

module.exports = class Fields {

    constructor(request) {

        this.props = {
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
        }

        this.gameName = new Validator({
            type: 'string',
            name: 'nombre del juego',
            prop: 'gameName',
            enum: ['tiktok', 'sesgosCognitivos', 'quizzFinanciero', 'quizzFinal', 'laberintoWeb', 'laberintoVR'],
            value: this.props.gameName,
            required: true
        })

        this.code = new Validator({
            type: 'string',
            name: 'codigo',
            prop: 'code',
            value: this.props.code,
            required: true
        })

        this.used = new Validator({
            type: 'boolean',
            name: 'usado',
            prop: 'used',
            value: this.props.used,
            required: false
        })
    }
}