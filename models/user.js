const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const slug = require('../utils/slugify');

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
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Roles',
        default: ['66c1267521c74bb2c3a0d066']
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: mongoose.Schema.Types.Mixed,
        default: "https://res.cloudinary.com/ibrahimsezer/image/upload/v1723573812/bookStore/users_profiles/avatar_hpi6g8.jpg"
    },
    avatar_public_id: {
        type: String
    },
    resetPasswordToken: {
        type: String,
        default: ''
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('username')) {
        this.slug = slug(this.username);
    }
    
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    next();
});



userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, username: this.username, roles: this.roles },
        process.env.JWT_SECRET || 'SUPER_SECRET_KEY',
        { expiresIn: '12h' }
    );
    return token;
};

const validateUser = (user) => {
    const schema = new Joi.object({
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(1024).required(),
        roles: Joi.array().items(Joi.string()),
        resetPasswordToken: Joi.string().allow(''),
        resetPasswordExpires: Joi.date()
    });

    return schema.validate(user);
};

const validateUserUpdate = (user) => {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30),
      email: Joi.string().email(),
      password: Joi.string().min(5).max(255),
      avatar: Joi.string()
    });
  
    return schema.validate(user);
  };

const validateLogin = (req) => {
    const schema = new Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(1024).required()
    });

    return schema.validate(req);
};

const User = mongoose.model('User', userSchema);

module.exports = { User, validateUser, validateLogin, validateUserUpdate };
