const express = require('express');
const router = express.Router();
const user = require("../models/userModels");
const farmUnionLeader =require("../models/farmUnionModel");
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");



// apply for farmUnionLeader account
router.post('/apply-farmUnionLeader-account', async (req, res) => {
    try {
      const newfarmUnionLeader = new farmUnionLeader({ ...req.body, status: "pending" });
      await newfarmUnionLeader.save();
      
      const adminUser = await user.findOne({ isAdmin: true });
      const unseenNotification = adminUser.unseenNotification;
      unseenNotification.push({
        type: "new farmUnionLeader-request",
        message: `${newfarmUnionLeader.firstName} ${newfarmUnionLeader.lastName} has applied for farmUnionLeader`,
        data: {
          farmUnionLeaderId: newfarmUnionLeader._id,
          name: newfarmUnionLeader.firstName + " " + newfarmUnionLeader.lastName,
        },
        onClick: "/admin/farmUnionLeaders",
      });
      
      await user.findByIdAndUpdate(adminUser._id, { unseenNotification });
      
      res.status(200).send({
        success: true,
        message: "farmUnionLeader account created successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Error applying for farmUnionLeader account", success: false });
    }
  });


  // Update profile
router.put('/update-profile', async (req, res) => {
  try {
    const farmUnionLeaderId = req.body.farmUnionLeaderId;
    const updatedProfile = req.body.updatedProfile;
    const result = await farmUnionLeader.findByIdAndUpdate(farmUnionLeaderId, updatedProfile);
    if (result) {
      return res.status(200).send({ message: "Profile updated successfully", success: true });
    } else {
      return res.status(404).send({ message: "Farm Union Leader not found", success: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error updating profile", success: false });
  }
});

// Make order
router.post('/make-order', async (req, res) => {
  try {
    // Logic for making an order goes here
    // ...
    return res.status(200).send({ message: "Order created successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error making order", success: false });
  }
});

// Update order
router.put('/update-order/:orderId', async (req, res) => {
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

// Make appointment to admin
router.post('/make-appointment', async (req, res) => {
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
router.post('/chat', async (req, res) => {
  try {
    // Logic for handling chat goes here
    // ...
    return res.status(200).send({ message: "Chat handled successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error handling chat", success: false });
  }
});

// Track order
router.get('/track-order/:orderId', async (req, res) => {
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






  // update profile 
  // make order 
  // update order
  // track order
  // make appointmen to admin 
  // search information 
  // chatt

module.exports=router;