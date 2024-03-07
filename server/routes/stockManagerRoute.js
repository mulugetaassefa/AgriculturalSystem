const express = require('express');
const router = express.Router();
const inputs =require("../models/inputModel");
const order =require('../models/orderModel');
const authMiddleware =require("../middleware/authMiddleware");


// add inputs 

router.post('/inputs/register', async (req, res) => {
    try {
      const newInput = new inputs(req.body);
      const savedInput = await newInput.save();
      res.status(200).send({ message: "Input added successfully", success: true, data: savedInput });
    } catch (error) {
      res.status(500).send({ message: "Error adding input", success: false });
    }
  });

  // delete inputs by id
  router.delete('/inputs/:id', async (req, res) => {
    try {
      const deletedInput = await inputs.findByIdAndDelete(req.params.id);
      if (deletedInput) {
        res.status(200).send({ message: "Input deleted successfully", success: true, data: deletedInput });
      } else {
        res.status(404).send({ message: "Input not found", success: false });
      }
    } catch (error) {
      res.status(500).send({ message: "Error deleting input", success: false });
    }
  });
  
  // update inputs by id

  router.put('/inputs/:id', async (req, res) => {
    try {
      const updatedInput = await inputs.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (updatedInput) {
        res.status(200).send({ message: "Input updated successfully", success: true, data: updatedInput });
      } else {
        res.status(404).send({ message: "Input not found", success: false });
      }
    } catch (error) {
      res.status(500).send({ message: "Error updating input", success: false });
    }
  });


//  manage orders

// Route for stock manager to view orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders' });
  }
});

// report generate
router.get('/reports/inputs', async (req, res) => {
  try {
    const Inputs = await inputs.find().sort({ date: 'desc' });

  
    const report = Inputs.map((input) => {
      return {
        name: input.name,
        quantity: input.quantity,
        date: input.date,
      };
    });

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error generating report' });
  }
});


// Route to accept an order
router.put('/orders/:id/accept', async (req, res) => {
  try {
    const orderId = req.params.id;
    const acceptedOrder = await order.findByIdAndUpdate(orderId, { status: 'Accepted' }, { new: true });

    // Update the stock or perform any other necessary actions
    

    res.status(200).json(acceptedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error accepting order' });
  }
});

// Route to reject an order
router.put('/orders/:id/reject', async (req, res) => {
  try {
    const orderId = req.params.id;
    const rejectedOrder = await order.findByIdAndUpdate(orderId, { status: 'Rejected' }, { new: true });

    res.status(200).json(rejectedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting order' });
  }
});


  module.exports = router;
