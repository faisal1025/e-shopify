
const bcrypt = require('bcrypt')
// models
const User = require('../models/users')
const emailVerification = require('../models/emailVerification')
// services
const {sendVerificationMail} = require('../services/mail')
const {setToken} = require('../services/auth')

async function handleVerifyEmail(req, res){
    const {email} = req.body
    const otp = Math.floor(1000+Math.random()*9000).toString()
    
    const user = await User.findOne({email: email})
    if(user){
        return res.status(400).json({
            msg: "Email already registered."
        })
    }
    const hashOtp = await bcrypt.hash(otp, 10)
    const expiresAt = new Date(Date.now())
    expiresAt.setMinutes(expiresAt.getMinutes()+5)
    try {
        // adding in database
        const updatedResult = await emailVerification.findOneAndUpdate(
            {email: email},
            {
                hashOtp,
                expiresAt
            }
        )
        if(updatedResult){
            // send mail
            sendVerificationMail(email, otp)
            return res.status(200).json({
                data: updatedResult,
                msg: 'Opt send successfully'
            })
        }else{
            const result = await emailVerification.create({
                email,
                hashOtp,
                expiresAt
            })
            // send mail
            sendVerificationMail(email, otp)
            if(result){
                return res.status(201).json({
                    data: result,
                    msg: 'Opt send successfully'
                })
            }
        }
    } catch (error) {
        return res.status(400).json({
            msg: error.message
        })
    }
}

async function handleVerifyOtp(req, res){
    const {email, otp} = req.body

    const result = await emailVerification.findOne({
        email: email
    })
    
    if(!result){
        return res.status(400).json({
            data: result,
            msg: "Account doesn't exist or account already verified"
        })
    }else if(result.expiresAt < Date.now()){
        return res.status(400).json({
            data: result,
            msg: "Otp is expired, please resend otp"
        })
    }else{
        bcrypt.compare(otp, result.hashOtp, (err, same) =>{
            if(err){
                return res.status(500).json({
                    data: result,
                    msg: "Something went wrong please try again."
                })
            }
            if(same === true){
                emailVerification.deleteMany({email:email}).then(()=>{
                    return res.status(200).json({
                        data: result,
                        msg: "Your account has been verified"
                    })
                }).catch((err) => {
                    return res.status(500).json({
                        data: result,
                        msg: err.message
                    })
                })
            }else{
                return res.status(400).json({
                    data: result,
                    msg: "Otp is not correct"
                })
            }
        });
    }
}

async function handleResendOtp(req, res){
    const {email} = req.body
    const otp = Math.floor(1000+Math.random()*9000).toString()
    // send mail
    // adding in database
    const hashOtp = await bcrypt.hash(otp, 10)
    try {
        const expiresAt = new Date(Date.now())
        expiresAt.setMinutes(expiresAt.getMinutes()+5)
        const result = await emailVerification.findOneAndUpdate({
            email: email
        },{
            hashOtp,
            expiresAt
        })
        if(result){
            sendVerificationMail(email, otp)
            res.status(201).json({
                data: result,
                msg: 'Opt send successfully'
            })
        }else{
            res.status(500).json({
                msg: "Something went wrong!! please try again."
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

async function handleRegister(req, res){
    var {first_name, last_name, email, password} = req.body
    var isAdmin = email === 'faisalprofessional1@gmail.com' ? true : false;
    password = await bcrypt.hash(password, 10)
    try {
        const result = await User.create({
            first_name,
            last_name,
            email,
            password,
            isAdmin
        })
        const token = await setToken(result)
        res.status(201).json({
            token: token,
            data: result,
            msg: "Account created Successfully"
        })
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
}

async function handleLogin(req, res){
    const {email, password} = req.body;

    const user = await User.findOne({
        email:email
    })

    if(!user){
        return res.status(400).json({
            msg: "User is not registered."
        })
    }

    bcrypt.compare(password, user.password, async (err, same) => {
        if(err){
            return res.status(500).json({
                msg: err.message
            })
        }
        if(same){
            const token = await setToken(user)
            return res.status(200).json({
                token: token,
                msg: "User is successfully logged in."
            })
        }else{
            return res.status(400).json({
                msg: "Password is wrong"
            })
        }
    })
}

module.exports = { 
    handleVerifyEmail, 
    handleVerifyOtp, 
    handleResendOtp, 
    handleRegister, 
    handleLogin 
}