const mongoose = require('mongoose');

const branchSttafSchema = new mongoose.Schema({
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
      type:String,
      required:true,
    },
    address: {
      type: String,
      required: true,
    },
      status:{
        type:String,
        default: "pending"
      },
      branchId : {
        type:String,
        required: true,
      },
      branchName : {
        type : String,
        required : true,
      }
    });

 const branchStaffModel = mongoose.model('branchStaff', branchSttafSchema);
  module.exports = branchStaffModel;

  