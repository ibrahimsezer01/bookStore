const transporter = require('../config/nodemailer')
const logger = require('../middlewares/logger')
const config = require('config')

const from = config.get("mail.auth.user")

const sendMail = async (to, text) => {

    const mail = {
        from: from,
        to: to,
        subject: "Book Store - New Message",
        text: text
    };

    await transporter.sendMail(mail);
    logger.info("Email sent successfully");
}

module.exports = sendMail