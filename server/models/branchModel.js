const mongoose =require('mongoose')

const branchSchema =mongoose.Schema({
    branchId : {
        type: String,
        required : true,
        unique: true,
    },
    branchName : {
        type : String,
        require: true,
    },
   branchLocation : {
        type : String,
        require: true,
    },
   branchStatus : {
        type : String,
        require: true,
    },
   branchStaff : {
        type : String,
        require: true,
    },
    branchInputs: [
        {
         name : {
            type: String,
            required: true,
         },
         quantity: {
            type: Number,
            required: true,
          },
          category : {
            type: String,
            required: true, 
          }
        }
    ]

    
});

const branchModel =mongoose.model('branch', branchSchema);
module.exports =branchModel;