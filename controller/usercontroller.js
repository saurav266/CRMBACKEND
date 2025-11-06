import mongoose from "mongoose";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    const { name, email, password, role, profileImage } = req.body;
    if(!name){
        return  res.status(400).json({ message: "Name is required" });
    }
    if(!email){
        return  res.status(400).json({ message: "Email is required" });
    }
    if(!password){
        return  res.status(400).json({ message: "Password is required" });
    }
    // if(!role){
    //     return  res.status(400).json({ message: "Role is required" });
    // }
  try {
    const userExist=await User.findOne({ email });
    if(userExist){
        return res.status(400).json({ message: "User already exists with this email" });    
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user=await User.create({
        name,
        email,
        password: hashedPassword,
        
        role,
        profileImage
    });
    res.status(201).json({
        sucess: true,
        message: "User registered successfully",
        user 

    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // ✅ Set token in httpOnly cookie
    res.cookie("token", token, {
  httpOnly: true,
  secure: false, // true in production with HTTPS
  sameSite: "Strict",
  maxAge: 24 * 60 * 60 * 1000,
});

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const verify = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User verified",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logout successful" });
}

