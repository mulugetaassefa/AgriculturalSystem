const mongoose =require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId:{
      type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
      },
      products: [
        {
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
        },
      ],
      totalAmount: {
        type: Number,
        required: true,
      },
      orderDate: {
        type: Date,
        default: Date.now,
      },
      orderLocation : {
        type : String,
        required: true,
      },
});

const orderModel = mongoose.model('order',orderSchema );
module.exports =orderModel;