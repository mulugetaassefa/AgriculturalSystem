
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

  module.exports =router;