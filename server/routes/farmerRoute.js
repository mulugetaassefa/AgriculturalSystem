const express = require('express');
const router = express.Router();
const user = require("../models/userModels");
const farmerModel = require("../models/farmerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Apply for Farmer account
router.post('/apply-farmer-account', async (req, res) => {
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

module.exports = router;