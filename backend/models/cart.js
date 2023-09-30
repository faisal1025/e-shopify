const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        unique: true
    },
    products: [
        {
            qty: Number,
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'products'}
        }
    ]
}, {timestamps: true})

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart