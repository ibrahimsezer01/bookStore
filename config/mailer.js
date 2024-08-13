const nodemailer = require("nodemailer")
const config = require("./default")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: config.mail.port,
    secure: config.mail.secure,
    tls: {
        ciphers: "SSLv3"
    },
    auth: {
        user: config.mail.auth.user,
        pass: config.mail.auth.pass
    },
});


module.exports = transporter