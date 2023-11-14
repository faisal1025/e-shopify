const mongoose = require('mongoose')

const likedProductSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            }
        }
    ]
}, {timestamps: true})

const LikedProduct = mongoose.model('likedProduct', likedProductSchema)

module.exports = LikedProduct;