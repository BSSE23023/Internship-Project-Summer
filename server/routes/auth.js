import express from "express";
import { User } from "../models/user.js";
import Joi from "joi";
import bcrypt from 'bcrypt';

const router = express.Router();

const validateAuth = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password")
  });
  return schema.validate(data);
};

router.post("/", async (req, res) => {
  try {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const email = req.body.email.toLowerCase().trim();
    const password = req.body.password;
    
    // Find user with case-insensitive email
    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    
    if (!user) return res.status(401).json({ message: "Invalid Email or Password" });

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid Email or Password" });

    // Generate token
    const token = user.generateAuthToken();
    
    return res.status(200).json({ 
      token, 
      message: "Logged in successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message 
    });
  }
});

export default router;