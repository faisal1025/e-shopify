const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.secret

const setToken = async (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        isAdmin: user.isAdmin
    }
    return jwt.sign(payload, secret)
}

const getToken = async (token) => {
    return jwt.verify(token, secret, (err, decoded)=>{
        if(err) return {status: false, err: err};
        else return {status: true, decoded: decoded};
    })
}

module.exports = {
    setToken,
    getToken
}