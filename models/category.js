const mongoose = require('mongoose');
const Joi = require('joi');

// Category şeması tanımlama
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50
  },
  description: {
    type: String,
    maxlength: 255
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

// Joi doğrulama şeması oluşturma
const validateCategory = (category) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(255),
    books: Joi.array().items(Joi.string())
  });

  return schema.validate(category);
};

// Model oluşturma
const Category = mongoose.model('Category', categorySchema);

module.exports = { Category, validateCategory };
