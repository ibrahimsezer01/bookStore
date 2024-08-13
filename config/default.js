const config = {
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        cluster: process.env.DB_CLUSTER
    },

    mail: {
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE === 'false',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    }
}

module.exports = config