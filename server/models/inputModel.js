const mongoose = require('mongoose');

const inputsSchema = new mongoose.Schema({
  inputId : {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  manufacturer: {
      type: String,
      required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  expiryDate: {
    type: String,
    required: true,
  },
});

const inputsModel = mongoose.model('inputs', inputsSchema);
module.exports = inputsModel;