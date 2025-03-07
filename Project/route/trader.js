const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/TraderSchema")
const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password,loggedIn } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, msg: "User already exists" });
    }

    // Create a new user
    user = new User({ name, email, password,loggedIn});
    await user.save();

    res.status(201).json({ success: true, msg: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

module.exports = router;