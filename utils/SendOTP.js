const nodemailer = require('nodemailer');
const randomstring = require("randomstring");
// <-------- Send OTP-------------->
const SendOTP = async (email) => {
    const otp = randomstring.generate({
        length: 6,
        charset: "numeric",
    })


    // Send OTP to the user's email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sunilmi7891@gmail.com',
            pass: 'xbiu chpv laru tvlp', 
        },
    });

    await transporter.sendMail({
        to: email,
        subject: 'Your OTP for registration',
        text: `Your OTP is: ${otp} Vaild For 10 min`,
    });
    return otp;
}

module.exports = SendOTP