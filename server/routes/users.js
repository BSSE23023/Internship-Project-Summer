import express from "express";
import { User, validateUser } from "../models/user.js";
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const email = req.body.email.toLowerCase().trim();
    
    // Case-insensitive email check
    const existingUser = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    if (existingUser) return res.status(409).json({ message: "User with this email already exists!" });

    // Create new user - password will be hashed by pre-save hook
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: email,
      password: req.body.password
    });

    await newUser.save();
    
    return res.status(201).json({ 
      message: "User created successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    
    // Handle duplicate key error separately
    if (error.code === 11000) {
      return res.status(409).json({ 
        message: "User with this email already exists!" 
      });
    }
    
    return res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message 
    });
  }
});

export default router;