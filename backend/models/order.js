const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    products: [
        {
            qty: Number,
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'product'}
        }
    ],
    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Order = mongoose.model('order', orderSchema)

module.exports = Order