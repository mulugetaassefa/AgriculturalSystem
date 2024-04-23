const express =require('express');
const branchStaffRouter =express.Router();
const branch =require('../models/branchModel')
const farmer =require('../models/farmerModel')
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

   // farmer route
    // Create new farmer
branchStaffRouter.post('/create-farmer', async (req, res) => {
  try {
    const existingFarmer = await farmer.findOne({ userId: req.body.userId });
    if (existingFarmer) {
      return res.status(200).send({ message: "farmer already exists", success: false });
    } else {
      const newFarmer = new farmer(req.body);
      await newFarmer.save();
      return res.status(200).send({ message: "farmer created successfully", success: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error occurred while creating farmer. Please try again!", success: false });
  }
});


// get all farmer

 // get all brachStaff
  branchStaffRouter.get('/getAllFarmer', async (req,res) => {
   try {
    const   farmers =await  farmer.find({});
    res.status(200).send({
      success: true,
      message: "farmer Data List",
      data: farmers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "farmer does not exist",
      error,
    });
  }

 });

 // delete farmer by id
 branchStaffRouter.delete('/delete-farmer/:id', async (req, res) => {
  try {
    const farmerId = req.params.id;
    const result = await farmer.findByIdAndDelete(farmerId);
    if (result) {
      return res.status(200).send({ message: "farmer deleted successfully", success: true });
    } else {
      return res.status(404).send({ message: "farmer not found", success: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error occurred while deleting farmer. Please try again!", success: false });
  }
});
 

module.exports =branchStaffRouter;



