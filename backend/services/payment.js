const Razorpay = require('razorpay')

require('dotenv').config()

const instance = new Razorpay({
    key_id: process.env.razorpay_key_id,
    key_secret: process.env.razorpay_key_secret,
});

module.exports = instance

