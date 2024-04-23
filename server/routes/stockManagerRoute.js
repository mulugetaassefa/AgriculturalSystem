const express = require('express');
const router = express.Router();
const inputs =require("../models/inputModel");
const order =require('../models/orderModel');
const Category =require('../models/category');
const authMiddleware =require("../middleware/authMiddleware");
const {  ObjectId, Types } = require('mongoose');
const nodemailer = require('nodemailer');

  
// add inputs 

router.post('/createInput', async (req, res) => {
    try {
      const { inputId, name, category, manufacturer, price, quantity, expiryDate } = req.body;
        const input =new   inputs({ inputId, name, category, manufacturer, price, quantity, expiryDate });
        await input.save();
      res.status(201).send({  success: true, data: "inputs created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({  success: false, error: 'Failed to create input'});
    }
  });
 
  // delete inputs by id
  router.delete('/input/:id', async (req, res) => {
    try {
      const deletedInput = await inputs.findOneAndDelete({ _id: req.params.id });
      if (deletedInput) {
        return res.status(200).send({ message: "Input deleted successfully", success: true });
      } else {
        return res.status(404).send({ message: "Input not found", success: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Error deleting input", success: false });
    }
  });

      // get input by id
  router.get('/input/:id', async (req, res) => {
    try {
      const input = await inputs.findOne({ _id: req.params.id });
  
      if (input) {
        res.status(200).send({ message: "Input retrieved successfully", success: true, data: input });
      } else {
        res.status(404).send({ message: "Input not found", success: false });
      }
    } catch (error) {
      res.status(500).send({ message: "Error retrieving input data", success: false });
    }
  });
  
   // Update input by id
router.put('/input/:inputId', async (req, res) => {
  try {
    const updatedInput = await inputs.findByIdAndUpdate(req.params.inputId, req.body, { new: true });
    if (updatedInput) {
      res.status(200).send({ message: "Input updated successfully", success: true, data: updatedInput });
    } else {
      res.status(404).send({ message: "Input not found", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error updating input", success: false });
  }
});

 // get all inputs
router.get('/getAllInputs', async (req, res) => {
  try {
    const input = await inputs.find({});
    res.status(200).send({
      success: true,
      message: "Inputs data list",
      data: input,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while fetching inputs',
      error,
    });
  }
});
                // Category

  // Create a category
router.post('/createCategory', authMiddleware, async (req, res) => {
  try {
    const { categoryId, name, quantity, price } = req.body;
    const category = new Category({categoryId, name, quantity, price });
    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to create category' });
  }
});

// Delete a category by id
router.delete('/deleteCategory/:categoryId', authMiddleware, async (req, res) => {
  try {
    const category = await Category.findOneAndDelete(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to delete category' });
  }
});

// Update a category by id
router.put('/categories/:id', async (req, res) => {
  try {
    const {categoryId, name, quantity, price } = req.body;
    const category = await Category.findByIdAndUpdate(req.params.id, {categoryId, name, quantity, price }, { new: true });
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to update category' });
  }
});

 // Get all categories
router.get('/getAllCategory', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch categories' });
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

// Check expiration date and notify storage manager
router.get('/check-expiration-date', async (req, res) => {
  try {
    // Get inputs that are closer to expiration date
    const currentDate = new Date();
    const expirationDateThreshold = new Date();
    expirationDateThreshold.setDate(expirationDateThreshold.getDate() + 7); // Example: Consider inputs closer to expiration within 7 days

    const expiringInputs = await inputs.find({ expirationDate: { $gte: currentDate, $lte: expirationDateThreshold } });

    // Notify storage manager
    const storageManagerId = 'storage-manager-id'; // Replace with the storage manager's ID or find it dynamically based on your system
    const notificationMessage = `There are inputs closer to the expiration date. Please take necessary actions.`;

    // Write your notification logic here to send the notification to the storage manager
    // ...

    res.status(200).send({ message: "Expiration date checked successfully", success: true, data: expiringInputs });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error checking expiration date", success: false });
  }
});


// Configure nodemailer to send email notifications
const transporter = nodemailer.createTransport({
  host: 'your_email_host',
  port: 587,
  secure: false,
  auth: {
    user: 'your_email_username',
    pass: 'your_email_password',
  },
});

// Function to fetch inputs with expiration dates close to or less than one month away
async function getInputsExpiringSoon() {
  const currentDate = new Date();
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

  const input = await inputs.find({
    expirationDate: { $lte: oneMonthFromNow },
  }).exec();

  return input;
}


// Function to send email notification to the stock manager
function sendStockManagerNotification(stockManagerEmail, subject, message) {
  const mailOptions = {
    from: 'your_email_address',
    to: stockManagerEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}



 module.exports = router;
