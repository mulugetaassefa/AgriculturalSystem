// Assuming you are using a database and an ORM like Mongoose for MongoDB

const mongoose = require('mongoose');

// Define the Category schema
const categorySchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;