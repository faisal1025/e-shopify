const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    products: [
        {
            qty: Number,
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'products'}
        }
    ]
}, {timestamps: true})

const Order = mongoose.model('order', orderSchema)

module.exports = Order