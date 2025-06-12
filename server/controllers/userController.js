const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const createUser = async (req, res) => {
    
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ username: name });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: name,
            email: email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



const loginUser = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ username: name });
        const token = jwt.sign(
  { userId: user._id, username: user.username }, // payload
  process.env.JWT_SECRET,                         // secret
  { expiresIn: process.env.JWT_EXPIRES_IN }      // options
);
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        res.status(200).json({ message: "Login successful", user,token: token });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = {loginUser,createUser };
