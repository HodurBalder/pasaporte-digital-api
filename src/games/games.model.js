const Schema = require('mongoose').Schema
const Model = require('mongoose').model
const ObjectId = require('mongoose').Types.ObjectId
const Mixed = require('mongoose').Schema.Types.Mixed
const Messages = require('./games.messages')

const schema = new Schema({

    userId: {
        type: ObjectId,
        required: true
    },

    user: {
        type: ObjectId,
        ref: 'Users',
    },

    gameName: {
        type: String,
        required: true
    },

    playCount: {
        type: Number,
        default: 1
    },

    score: {
        type: Number,
        default: 0
    },

    level: {
        type: String
    },

    completed: {
        type: Boolean,
        default: false
    },

    additionalData: {
        type: Mixed 
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
    this.user = this.userId
    this.updated = new Date()
    next()
})

schema.post('save', function(err, doc, next) {
    if(err) return next(new Messages(err).gameSaveError)
    next()
})

schema.post('remove', function(err, doc, next) {
    if(err) return next(new Messages(err).gameDeleteError)
    next()
})

schema.post('findOne', function(err, doc, next) {
    if(err) return next(new Messages(err).gameGetError)
    next()
})

schema.post('find', function(err, doc, next) {
    if(err) return next(new Messages(err).gameGetError)
    next()
})

module.exports = Model('Games', schema)