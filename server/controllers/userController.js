const User = require('../models/User');
const bcrypt = require('bcryptjs');

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



module.exports = { createUser };

