const mongoose =reqiure('mongoose');

const notifySchema = mongoose.Schema({
    notifyId :{
        type: String,
        requred: true,
    },
    userId  :{
        type: String,
        requred: true,
    },
   header :{
        type: String,
        requred: true,
    },
    content :{
        type: String,
        requred: true,
    },
    status :{
        type: String,
        requred: true,
    },
});

const notifyModel = mongoose.model('notify', notifySchema);
module.exports =notifyModel;