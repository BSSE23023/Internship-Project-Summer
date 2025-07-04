import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from 'joi';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { type: String, required: true },
  role: { type: String, default: "student" }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const saltRounds = Number(process.env.SALT) || 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.generateAuthToken = function() {
  try {
    if (!process.env.JWTPRIVATEKEY) {
      throw new Error("JWT private key is missing");
    }
    
    return jwt.sign(
      { 
        _id: this._id,
        email: this.email,
        role: this.role 
      },
      process.env.JWTPRIVATEKEY,
      { expiresIn: '1h' }
    );
  } catch (error) {
    console.error("Token generation error:", error);
    throw error;
  }
};

const validateUser = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(6).required().label('Password')
  });
  
  return schema.validate(data);
};

const User = mongoose.model('User', userSchema);

export { User, validateUser };