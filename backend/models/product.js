const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    brand: {
        type: String,
    },
    qty: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    subCategory: {
        type: String,
    },
    photos:[
        {
            link: String
        }
    ] 
}, {timestamps: true})

const Product = mongoose.model('product', productSchema)

module.exports = Product