const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true,
        unique: true
    },
}, {timestamps: true})

const Category = mongoose.model('category', categorySchema)

module.exports = Category