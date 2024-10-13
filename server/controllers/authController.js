import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const signup = async (req, res) => {
  const { name, email, password, age, gender, genderPreference } = req.body;
  try {
    if (!name || !email || !password || !age || !gender || !genderPreference) {
      return res.status(400).json({
        sucess: false,
        message: "All fields are required",
      });
    }
    if (age < 18) {
      return res.status(400).json({
        sucess: false,
        message: "You must at least 18 years of old",
      });
    }
    if (password.lenth < 6) {
      return res.status(400).json({
        sucess: false,
        message: "Password must be at least 6 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      hashedPassword,
      age,
      gender,
      genderPreference,
    });

    const token = signToken(newUser._id);
    res.cookie("jwt-token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true, // prevent XSS attacks
      sameSite: "strict", //prevents CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(201).json({
      sucess: true,
      message: "The user registered successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    console.log("Error Occured with", error);
    return res.status(500).json({
      sucess: false,
      message: "Server Error",
    });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        sucess: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        sucess: false,
        message: "please check once whether this email is registered or not",
      });
    }
    const matchingPassword = await bcrypt.compare(password, user.password);
    if (!matchingPassword) {
      return res.status(400).json({
        sucess: false,
        message: "please check your password again",
      });
    }
    const token = signToken(user._id);
    res.cookie("jwt-token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true, // prevent XSS attacks
      sameSite: "strict", //prevents CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({
      sucess: true,
      message: `${user.name} login done successfully`,
      user,
      token,
    });
  } catch (error) {
    console.log("Error Occured with", error);
    return res.status(500).json({
      sucess: false,
      message: "Server Error",
    });
  }
};



export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-token")
    return res.status(200).json({
        sucess: true,
        message: "You have logged out successfully"
    })
  } catch (error) {
    console.log("Error Occured with", error);
    return res.status(500).json({
      sucess: false,
      message: "Server Error",
    });
  }
};
