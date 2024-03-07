const mongoose =require('mongoose')

const reportSchema = new mongoose.Schema({
    reportId : {
        type: String,
        required: true,
    },
    userId  : {
        type: String,
        required: true,
    },
    reportName : {
        type: String,
        required: true,
    },
    content : {
        type: String,
        required: true,
    },
    reportDate : {
        type: String,
        required: true,
    },
});

const reportModel =mongoose.model('report',reportSchema);

module.exports =reportModel;