const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
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
    password: {
      type: String,
      required: false,
    },
     website: {
      type:String,
      required:false,
    },
    phoneNumber: {
      type:String,
      required:true,
    },
    address: {
      type: String,
      required: true,
    },
  specialization: {
      type: String,
      required: true,
    },
    feePerConsultation: {
        type: Number,
        required: true,
      },
      timings: {
        type: Array,
        required:true
      },
      status:{
        type:String,
        default: "pending"
      },

  }, { timestamps: true });

 const investorModel = mongoose.model('investors', investorSchema);
  module.exports = investorModel;