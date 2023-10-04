const Schema = require('mongoose').Schema
const Model = require('mongoose').model
const ObjectId = require('mongoose').Types.ObjectId
const Messages = require('./codes.messages')

const schema = new Schema({

    gameName: {
        type: String
    },

    code: {
        type: String
    },

    used: {
        type: Boolean,
        default: false
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
    next()
})

schema.post('save', function(err, doc, next) {
    if(err) return next(new Messages(err).codeSaveError)
    next()
})

schema.post('remove', function(err, doc, next) {
    if(err) return next(new Messages(err).codeDeleteError)
    next()
})

schema.post('findOne', function(err, doc, next) {
    if(err) return next(new Messages(err).codeGetError)
    next()
})

schema.post('find', function(err, doc, next) {
    if(err) return next(new Messages(err).codeGetError)
    next()
})

module.exports = Model('Codes', schema)