var nodemailer = require('nodemailer');
require("dotenv").config()


module.exports = {
    sendMail: async function (Email, recovery_token) {
        var transporter = nodemailer.createTransport({
            address: 'smtp.gmail.com',
            port: process.env.EMAIL_PORT,
            domain: 'gmail.com',
            service: 'gmail',
            auth: {
                user: process.env.COMPNY_EMAIL_ID,
                pass: process.env.EMAIL_PASS,
            }
        });
        var mailOptions = {
            from: process.env.COMPNY_EMAIL_ID,
            to: Email,
            subject: 'Reset your password ',
            html: '<p><a href="http://localhost:3000/forgotPassword/' + recovery_token + '">Click here</a> to reset your password</p>'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

