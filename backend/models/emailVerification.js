const mongoose = require('mongoose')

const emailVerificationSchema = mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    hashOtp: {
        type: String,
        require: true
    },
    expiresAt: {
        type: Date
    }
}, {timestamps: true})


const emailVerification = mongoose.model("emailVerification", emailVerificationSchema)

module.exports = emailVerification