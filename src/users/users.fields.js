const Validator = require('../validator')

module.exports = class Fields {

    constructor(request) {

        this.props = {
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
        }

        this.userId = new Validator({
            type: 'objectId',
            name: 'identificador del usuario',
            prop: 'userId',
            value: this.props.userId,
        })
    
        this.role = new Validator({
            type: 'string',
            name: 'rol',
            prop: 'role',
            value: this.props.role,
        })
    
        this.name = new Validator({
            type: 'string',
            name: 'nombre',
            prop: 'name',
            value: this.props.name,
        })

        this.lastName = new Validator({
            type: 'string',
            name: 'apellidos',
            prop: 'lastName',
            value: this.props.lastName,
        })

        this.email = new Validator({
            type: 'email',
            name: 'correo',
            prop: 'email',
            value: this.props.email,
        })
    
        this.phone = new Validator({
            type: 'string',
            name: 'teléfono',
            prop: 'phone',
            value: this.props.phone,
        })
    
        this.password = new Validator({
            type: 'string',
            name: 'contraseña',
            prop: 'password',
            value: this.props.password,
        })

        this.code = new Validator({
            type: 'string',
            name: 'codigo',
            prop: 'code',
            value: this.props.code,
        })

        this.token = new Validator({
            type: 'string',
            name: 'token',
            prop: 'token',
            value: this.props.token,
        })

        this.jwt = new Validator({
            type: 'string',
            name: 'jwt',
            prop: 'jwt',
            value: this.props.jwt,
        })
    }
}