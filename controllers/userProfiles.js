const cloudinary = require('../config/cloudinary');

exports.upload_user_profile = async (file) => {
    const result = await cloudinary.uploader.upload(file.path, {
        use_filenames: true,
        folder: process.env.CLOUD_USER_PROFILE,
        transformation: [{ width: 200, height: 200, crop: 'fill' }]
    });
    return result;
}

exports.delete_user_profile = async (public_id) => {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
};
