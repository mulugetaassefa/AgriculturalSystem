const mongoose =require('mongoose');

const farmUnionSchema =new mongoose.Schema({
    farmUnionId : {
        type : String,
        required : true,
    },
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
     location : {
        type : String,
        required : true,
    },
    status :  {
        type : String,
        required : true,
    },
    
});


const farmUnionModel =mongoose.model('farmUnion', farmUnionSchema);
 module.exports =farmUnionModel;

