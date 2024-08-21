const nodemailer = require("nodemailer")
const config = require("config")

const emailPort = config.get("mail.port") 
const emailSecure = config.get("mail.secure")

const authUser = config.get("mail.auth.user")
const authPass = config.get("mail.auth.pass")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: emailPort,
    secure: emailSecure,
    auth: {
        user: authUser,
        pass: authPass
    },
    tls: false,
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 30000
});


module.exports = transporter