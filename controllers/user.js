const bcrypt = require('bcrypt');
const { User, validateUser, validateLogin, validateUserUpdate } = require('../models/user');

exports.singup = async (req, res) => {
    const { username, email, password } = req.body

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: email });
    if (user) return res.status(400).send('Bu e-posta adresi zaten kayitli.');

    user = new User({
        username: username,
        email: email,
        password: password
    });

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({
        _id: user._id,
        username: user.username,
        email: user.email
    });
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

    const { error } = validateUserUpdate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let updatedFields = { username, email, password };
    if (password) {
        const salt = await bcrypt.genSalt(10);
        updatedFields.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updatedFields },
        { new: true, runValidators: true }
    ).select('-password');

    res.send(user);
}

exports.getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
}

