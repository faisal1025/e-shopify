const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        require: true
    },
    cartNumber: {
        type: mongoose.Schema.ObjectId,
        ref: 'cart'
    }
},
{timestapms: true})

const User = mongoose.model('user', userSchema)

module.exports = User