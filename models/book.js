const mongoose = require('mongoose');
const Joi = require('joi');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  page: {
    type: Number,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.String,
    ref: 'Category',
    required: true
  },
  comments: [commentSchema],
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const validateBook = (book) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    author: Joi.string().min(1).max(255).required(),
    page: Joi.number().integer().min(1).required(),
    releaseDate: Joi.date().required(),
    language: Joi.string().min(2).max(50).required(),
    category: Joi.string().required(),
    addedBy: Joi.string().required(),
    comments: Joi.array().items(
      Joi.object({
        user: Joi.string().required(),
        comment: Joi.string().min(1).max(1024).required(),
        date: Joi.date().default(Date.now)
      })
    ),
  });

  return schema.validate(book);
};

const validateUpdateBook = (book) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    author: Joi.string().min(1).max(255).required(),
    page: Joi.number().integer().min(1).required(),
    releaseDate: Joi.date().required(),
    language: Joi.string().min(2).max(50).required(),
  });

  return schema.validate(book);
}

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book, validateBook, validateUpdateBook };
