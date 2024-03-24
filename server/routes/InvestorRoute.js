
const express = require('express');
const router = express.Router();
const inputs =require("../models/inputModel");
const Investor =require('../models/investorModel');
const order =require('../models/orderModel');
const authMiddleware =require("../middleware/authMiddleware");


// apply for investor account
router.post('/apply-investor-account', authMiddleware, async (req, res) => {
    try {
      const newInvestor = new Investor({ ...req.body, status: "pending" });
      await newInvestor.save();
      
      const adminUser = await user.findOne({ isAdmin: true });
      const unseenNotification = adminUser.unseenNotification;
      unseenNotification.push({
        type: "new investor-request",
        message: `${newInvestor.firstName} ${newInvestor.lastName} has applied for investor`,
        data: {
          investorId: newInvestor._id,
          name: newInvestor.firstName + " " + newInvestor.lastName,
        },
        onClick: "/admin/investors",
      });
      
      await user.findByIdAndUpdate(adminUser._id, { unseenNotification });
      
      res.status(200).send({
        success: true,
        message: "Investor account created successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Error applying for investor account", success: false });
    }
  });


// Update profile
router.put('/update-profile', authMiddleware, async (req, res) => {
  try {
    const investorId = req.body.investorId;
    const updatedProfile = req.body.updatedProfile;
    const result = await Investor.findByIdAndUpdate(investorId, updatedProfile);
    if (result) {
      return res.status(200).send({ message: "Profile updated successfully", success: true });
    } else {
      return res.status(404).send({ message: "Investor not found", success: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error updating profile", success: false });
  }
});

// Update order
router.put('/update-order/:orderId', authMiddleware, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updatedOrder = req.body.updatedOrder;
    // Logic for updating the order with the given orderId using updatedOrder data goes here
    // ...
    return res.status(200).send({ message: "Order updated successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error updating order", success: false });
  }
});

// Track order
router.get('/track-order/:orderId', authMiddleware, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    // Logic for tracking the order with the given orderId goes here
    // ...
    return res.status(200).send({ message: "Order tracked successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error tracking order", success: false });
  }
});

// Make appointment to admin
router.post('/make-appointment', authMiddleware, async (req, res) => {
  try {
    // Logic for making an appointment to admin goes here
    // ...
    return res.status(200).send({ message: "Appointment created successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error making appointment", success: false });
  }
});


  // Chat
router.post('/chat', authMiddleware, async (req, res) => {
  try {
    // Logic for handling chat goes here
    // ...
    return res.status(200).send({ message: "Chat handled successfully", success: true });
  } catch (error) {
    console.log(error);
   return res.status(500).send({ message: "Error handling chat", success: false });
  }
});

// Search information
router.get('/search-information', authMiddleware, async (req, res) => {
  try {
    // Logic for searching information goes here
    // ...
    return res.status(200).send({ message: "Information searched successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error searching information", success: false });
  }
});

  // update profile 
  // make order 
  // update order
  // track order
  // make appointmen to admin 
  // search information 
  // chat

  module.exports =router;