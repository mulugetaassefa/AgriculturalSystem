const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    userId: {
        type:String,
        required: true,
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: String,
        required: true
      },
    address: {
      type: String,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    status:{
        type:String,
        default: "pending"
      },
      farmSize: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
        default: Date.now
      },
  
    });

 const farmerModel = mongoose.model('farmer', farmerSchema);
  module.exports = farmerModel;