const cloudinary = require('cloudinary').v2
const config = require('config')

const cloudName = config.get('cloudinary.cloud_name')
const apiKey = config.get('cloudinary.api_key')
const apiSecret = config.get('cloudinary.api_secret')

// cloudinary
cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
})

module.exports = cloudinary