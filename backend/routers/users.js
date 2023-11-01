const express = require('express')
const { handleVerifyEmail, handleVerifyOtp, handleResendOtp, handleRegister, handleLogin } = require('../controllers/users')

const router = express.Router()

router.post("/verify-email", handleVerifyEmail)

router.post("/verify-otp", handleVerifyOtp)

router.post("/resend-otp", handleResendOtp)

router.post("/register", handleRegister)

router.post("/login", handleLogin)

module.exports = router