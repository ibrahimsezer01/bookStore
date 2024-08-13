const cloudinary = require('../config/cloudinary');

exports.upload_book_images = async (file) => {
    const result = await cloudinary.uploader.upload(file.path, {
        use_filenames: true,
        folder: process.env.CLOUD_BOOK_IMAGES,
        transformation: [{ width: 300, height: 400, crop: 'fill' }],
    });
    return {
        url: result.secure_url,
        public_id: result.public_id,
    }
};

exports.delete_book_images = async (publicId) => {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
};