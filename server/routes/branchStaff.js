const express =require('express');
const branchStaffRouter =express.Router();
const branch =require('../models/branchModel')
const branchStaff =require('../models/branchStaffModel');



// Create new branchStaff
branchStaffRouter.post('/create-branchStaff', async (req, res) => {
    try {
      const existingBranchStaff = await branchStaff.findOne({ userId: req.body.userId });
      if (existingBranchStaff) {
        return res.status(200).send({ message: "BranchStaff already exists", success: false });
      } else {
        const newBranchStaff = new branchStaff(req.body);
        await newBranchStaff.save();
        return res.status(200).send({ message: "BranchStaff created successfully", success: true });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Error occurred while creating branchStaff. Please try again!", success: false });
    }
  });

 
  //update branch staff 
  branchStaffRouter.put('/update-branchStaff/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const updatedBranchStaff = await branchStaff.findByIdAndUpdate(id, req.body);
      if (updatedBranchStaff) {
        return res.status(200).send({ message: "BranchStaff updated successfully", success: true });
      } else {
        return res.status(404).send({ message: "BranchStaff not found", success: false });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Error occurred while updating branchStaff. Please try again!", success: false });
    }
  });

  // delete branch staff

  branchStaffRouter.delete('/delete-branchStaff/:id', async (req, res) => {
    try {
      const branchStaffId = req.params.id;
      const result = await branchStaff.findByIdAndDelete(branchStaffId);
      if (result) {
        return res.status(200).send({ message: "BranchStaff deleted successfully", success: true });
      } else {
        return res.status(404).send({ message: "BranchStaff not found", success: false });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Error occurred while deleting branchStaff. Please try again!", success: false });
    }
  });



module.exports =branchStaffRouter;



