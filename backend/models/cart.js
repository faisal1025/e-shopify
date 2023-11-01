const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        unique: true
    },
    products: [
        {
            qty: Number,
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'product'}
        }
    ]
}, {timestamps: true})

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart