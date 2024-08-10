const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User şeması tanımlama
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    roles: {
        type: [String],
        default: ['user'] // Kullanıcının rolleri, varsayılan olarak 'user' rolü
    },
    resetPasswordToken: {
        type: String,
        default: ''
    },
    resetPasswordExpires: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Parola hash'leme (save öncesi çalışır)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Kullanıcıya JWT token oluşturma
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, username: this.username, roles: this.roles },
        process.env.JWT_SECRET || 'SUPER_SECRET_KEY',
        { expiresIn: '12h' }
    );
    return token;
};

// Joi doğrulama şeması oluşturma
const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(1024).required(),
        roles: Joi.array().items(Joi.string()),
        resetPasswordToken: Joi.string().allow(''),
        resetPasswordExpires: Joi.date()
    });

    return schema.validate(user);
};

// Kullanıcı girişi doğrulaması (parola dahil)
const validateLogin = (req) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(1024).required()
    });

    return schema.validate(req);
};

// Model oluşturma
const User = mongoose.model('User', userSchema);

module.exports = { User, validateUser, validateLogin };
