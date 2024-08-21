const bcrypt = require('bcrypt');
const { User, validateUser, validateLogin, validateUserUpdate } = require('../models/user');
const { upload_user_profile, delete_user_profile } = require('./userProfiles');
const send_email = require("../utils/mailler");
const slugiField = require('../utils/slugify');

exports.singup = async (req, res) => {
    const { username, email, password } = req.body
    let avatar = req.file
    const slug = slugiField(username)

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: email });
    if (user) return res.status(400).send('Bu e-posta adresi zaten kayitli.');

    if (avatar) {
        var result = await upload_user_profile(avatar)
        var avatar_url = result.secure_url
        var avatar_public_id = result.public_id
    }

    user = new User({
        username: username,
        email: email,
        password: password,
        slug: slug,
        avatar: avatar ? avatar_url : undefined,
        avatar_public_id: avatar ? avatar_public_id : undefined,
    });

    await user.save();
    await send_email(email, "Your account has been created")

    const token = user.generateAuthToken();
    res.send(token);
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).send('Geçersiz e-posta.');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Geçersiz parola.');

    const token = user.generateAuthToken();
    res.send({ token });
}

exports.putUser = async (req, res) => {
    const { username, email, password } = req.body
    const avatar = req.file

    const { error } = validateUserUpdate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).send('Kullanici bulunamadi.');

    let updatedFields = { username, email };
    if (password) {
        const salt = await bcrypt.genSalt(10);
        updatedFields.password = await bcrypt.hash(password, salt);
    }

    if (avatar) {
        await delete_user_profile(user.avatar_public_id);
        var result = await upload_user_profile(avatar);
        user.avatar = result.secure_url;
        user.avatar_public_id = result.public_id;
    }

    user.set(updatedFields);
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).send(userResponse);
}

exports.getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
}

