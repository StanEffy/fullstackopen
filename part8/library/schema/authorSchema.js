const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    born: {
        type: Number,
        required: false
    },
})

module.exports = mongoose.model('author', schema, 'authors')
