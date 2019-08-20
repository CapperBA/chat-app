const mongoose = require('mongoose')

const {Schema} = mongoose

const boardgameModel = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true,},
    genre: {type: String, required: true,},
    description: {type: String},
    price: {type: Schema.Types.Decimal128},
    productDetails: {
        weight: {type: Schema.Types.Decimal128},
        dimensions: {type: String},
        ageRestriction: {type: Number},
        maxPlayers: {type: Number},
        minPlayers: {type: Number}
    },
    stockDetails: {
        quantity: {type: Number}
    }
})

module.exports = mongoose.model('Boardgame', boardgameModel)