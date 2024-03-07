const express =require('express');
const router =express.Router();
const branch =require('../models/branchModel')
const user = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const investor =require("../models/investorModel");
const branchStaff =require('../models/branchStaffModel');


router.post('/api/user', async (req, res) => {
try {
    
} catch (error) {
    
}
});

module.exports =router;