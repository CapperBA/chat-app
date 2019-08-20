const mongoose = require('mongoose')

const {Schema} = mongoose

const userModel = new Schema({
    username: {type: String, required: true, index: { unique: true }},
    role: {type: String, required: true, default: 0},
    password: {type: String, required: true},
})

module.exports = mongoose.model('User', userModel)