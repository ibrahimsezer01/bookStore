const mongoose = require('mongoose');
const Joi = require('joi');
const slug = require("../utils/slugify")

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  images: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
  images_public_id: {
    type: [String],
    required: true,
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comments',
    required: true 
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

bookSchema.pre('save', function(next) {
  if (this.isModified('username')) {
      this.slug = slug(this.username);
  }
  
  next();
});

const validateBook = (book) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    author: Joi.string().min(1).max(255).required(),
    page: Joi.number().integer().min(1).required(),
    releaseDate: Joi.date().required(),
    language: Joi.string().min(2).max(50).required(),
    category: Joi.string().required(),
    images: Joi.array().items(Joi.object()).required(),
    addedBy: Joi.string().required(),
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
    images: Joi.array().items(Joi.object()).required(),
    category: Joi.string().required(),
  });

  return schema.validate(book);
}

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book, validateBook, validateUpdateBook };
