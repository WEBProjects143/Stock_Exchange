
const User=require("../model/TraderSchema")

// User Login
const Tradercontroller= async (req,res) => {
  try {
    const { email, password} = req.body;
    // Find user in DB
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(400).json({ success: false, msg: "Invalid credentials" });
    }
    if (user.password !== password) { // Check if password matches
        return res.status(400).json({ success: false, msg: "Invalid credentials" });
      }

    res.status(200).json({ success: true, msg: "Login successful"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
module.exports=Tradercontroller