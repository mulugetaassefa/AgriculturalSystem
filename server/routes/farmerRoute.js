const express = require('express');
const farmerRouter = express.Router();
const user = require("../models/userModels");
const farmerModel = require("../models/farmerModel");




// Apply for Farmer account
farmerRouter.post('/apply-farmer-account', async (req, res) => {
  try {
    const newFarmer = new farmerModel({ ...req.body, status: "pending" });
    await newFarmer.save();

    const branchStaffUser = await user.findOne({ isAdmin: true });
    const unseenNotification = branchStaffUser.unseenNotification;
    unseenNotification.push({
      type: "new-farmer-request",
      message: `${newFarmer.firstName} ${newFarmer.lastName} has applied for a Farmer account`,
      data: {
        farmerId: newFarmer._id,
        name: newFarmer.firstName + " " + newFarmer.lastName,
      },
      onClick: "/admin/farmers",
    });

    await user.findByIdAndUpdate(branchStaffUser._id, { unseenNotification });

    res.status(200).send({
      success: true,
      message: "Farmer account created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error applying for Farmer account", success: false });
  }
});

 // Update profile
farmerRouter.put('/update-profile', async (req, res) => {
  try {
    const farmerId = req.body.farmerId;
    const updatedProfile = req.body.updatedProfile;
    const result = await farmerModel.findByIdAndUpdate(farmerId, updatedProfile);
    if (result) {
      return res.status(200).send({ message: "Profile updated successfully", success: true });
    } else {
      return res.status(404).send({ message: "Farmer not found", success: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error updating profile", success: false });
  }
});

// Make order
farmerRouter.post('/make-order', async (req, res) => {
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
farmerRouter.put('/update-order/:orderId', async (req, res) => {
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
farmerRouter.post('/make-appointment', async (req, res) => {
  try {
    // Logic for making an appointment to branchStaff goes here
    // ...
    return res.status(200).send({ message: "Appointment created successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error making appointment", success: false });
  }
});

 
 
 

module.exports = farmerRouter;