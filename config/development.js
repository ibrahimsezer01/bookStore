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
    },

    cloudinary: {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
        user_profile_path: process.env.CLOUD_USER_PROFILE_PATH,
        book_images_path: process.env.CLOUD_BOOK_IMAGES_PATH
    },
}

module.exports = config