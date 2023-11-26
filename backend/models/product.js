const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    subTitle: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    originalPrice: {
        type: Number,
        require: true
    },
    slug: {
        type: String,
        require: true,
        unique: true
    },
    brand: {
        type: String,
    },
    qty: {
        type: Number,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        require: true
    },
    thumbnail: {
        type: String,
        require: true
    },
    photos:[
        {
            link: String
        }
    ] ,
    description: {
        type: String
    }
}, {timestamps: true})

productSchema.index(
    { "$**": "text" }
)

const Product = mongoose.model('product', productSchema)

module.exports = Product