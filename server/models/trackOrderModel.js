const mongoose =require('mongoose');

const trackSchema =new mongoose.Schema({
    trackId: {
      type : String,
      required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    orderLocation : {
        type: String,
        required: true, 
    },
    orderStatus : {
        type: String,
        required: true,  
    }
});

const trackModel =mongoose.model('track', trackSchema);

module.exports = trackModel;