const express = require('express');
const router = express.Router();
const user = require("../models/userModels");
const Investor =require("../models/investorModel")
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const authMiddleware =require("../middleware/authMiddleware");

// register route
router.post('/register', async (req, res) => {
  try {
    const userExist = await user.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(200).send({ message: "User already exists", success: false });
    } else {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      req.body.password = hashPassword;
      const newUser = new user(req.body);
      await newUser.save();
      res.status(200).send({ message: "User created successfully", success: true });
    }
  } catch (error) {
    return res.status(500).send({ message: "Error creating user", success: false });
  }
});


// login route
router.post('/login', async (req, res) => {
  try {
    const userExist = await user.findOne({ email: req.body.email });
    if (!userExist) {
      return res.status(200).send({ message: "User not found", success: false });
    }
    const passwordMatch = await bcrypt.compare(req.body.password, userExist.password);
    if (!passwordMatch) {
      return res.status(200).send({ message: "Invalid password", success: false });
    } else {
      const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.status(200).send({ message: "Login successful", success: true, token });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error on login", success: false });
  }
});

// protected route
router.post('/get-user-info-by-id', authMiddleware, async (req, res) => {
  try {
    const foundUser = await user.findOne({ _id: req.body.userId });
    foundUser.password=undefined;
    if (!foundUser) {
      return res.status(200).send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data:foundUser,  
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Error getting user info", success: false, error });
  }
});


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

//   change unseen notification to seennotification

router.post(
  '/api/user/mark-all-notifications-as-seen', 
   authMiddleware, async (req, res) => {
  try {
    const User = await user.findOne({ _id: req.body.userId });
    const unseenNotification = User.unseenNotification;
    User.seenNotification = seenNotification;
    seenNotification.push(...unseenNotification);
    User.unseenNotification = [];
    User.seenNotification = seenNotification;
    const updatedUser = await User.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications marked as seen",
      data: updatedUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error marking all notifications as seen", success: false });
  }
});


// delete all notification
router.post('/delete-all-notifications', authMiddleware, async (req, res) => {
  try {
    const User = await user.findOne({ _id: req.body.userId });
    User.seenNotification = [];
    User.unseenNotification = [];
    const updatedUser = await User.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notification marked as seen",
      data: updatedUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error in deletion of notification", success: false });
  }
});



// Update user profile
// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    Object.keys(req.body).forEach((key) => {
      if (key !== 'email') {
        user[key] = req.body[key];
      }
    });

    if (req.file) {
      user.profilePicture = req.file.filename;
    }

    const updatedUser = await user.save();

    res.status(200).json({ message: 'User profile updated successfully', data: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
});





module.exports = router;