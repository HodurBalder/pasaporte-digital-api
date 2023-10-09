const Schema = require('mongoose').Schema
const Model = require('mongoose').model
const Messages = require('./users.messages')
const Methods = require('../methods')
const uuid = require('uuid');

const schema = new Schema({
    
    uuid: {
        type: String,
        default: uuid.v4, 
        select: false
    },

    role: {
        type: String,
        default: 'user'
    },

    name: {
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String
    },

    phone: {
        type: String
    },

    password: {
        type: String,
        select: false
    },

    updated: {
        type: Date
    },

    created: {
        type: Date,
        default: Date.now
    }
})

schema.pre('save', function(next) {

    this.updated = new Date()

    if(this.password)
        this.password = Methods.bcryptHash(this.password)

    next()
})

schema.post('save', function(err, doc, next) {
    if(err) return next(new Messages(err).userSaveError)
    next()
})

schema.post('remove', function(err, doc, next) {
    if(err) return next(new Messages(err).userDeleteError)
    next()
})

schema.post('findOne', function(err, doc, next) {
    if(err) return next(new Messages(err).userGetError)
    next()
})

schema.post('find', function(err, doc, next) {
    if(err) return next(new Messages(err).userGetError)
    next()
})

module.exports = Model('Users', schema)