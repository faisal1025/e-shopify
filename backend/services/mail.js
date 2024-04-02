const nodemailer = require("nodemailer");

require('dotenv').config()


const HOST = process.env.host
const PORT = process.env.port
const USERNAME = process.env.mail_username
const PASSWORD = process.env.mail_password


const transporter = nodemailer.createTransport({
  host: HOST,
  port: PORT,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: USERNAME,
    pass: PASSWORD,
  },
});

const sendVerificationMail = async (to, otp) => {
    const body = `<b>Please verify your email. Your OTP is : </b>
    <h1>${otp}</h1>`
    // console.log("hey there, from email send func", to, otp);
    transporter.sendMail({
        from: '"shopify_info" <shopify@gmail.com>', // sender address
        to: to, 
        // || "faisalprofessional1@gmail.com", // list of receivers
        subject: "Verify your email", // Subject line
        // text: `This is the otp please verify ${otp}`, // plain text body
        html: body, // html body
    }, (err, info) => {
        if(err){
            console.log("This is err of mail", err);
        }else{
            console.log("This is the mail Id", info.messageId)
        }
    })
}

module.exports = {
    sendVerificationMail
}