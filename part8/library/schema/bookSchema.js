const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    published: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true,
        minlength: 5
    },
    genres: {
        type: [String],
        required: true
    },
})

module.exports = mongoose.model('book', schema, 'books')
