const mongoose = require('mongoose');
const Joi = require('joi');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const validateComment = (comment) => {
    const schema = Joi.object({
        user: Joi.string().required(),
        bookId: Joi.string().required(),
        text: Joi.string().min(1).max(1024).required(),
    });

    return schema.validate(comment);
}

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment, validateComment };