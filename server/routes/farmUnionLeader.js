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

module.exports=router;