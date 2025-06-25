import { registerUserService } from "../services/user.service.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Register route Controller
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUserService(name, email, password);

    res.status(201).json({
      message: "User registered successfully",
      newUser: user,
    });
  } catch (error) {
    console.log(error);
    res.status(error?.status || 500).json({ error: error.message });
  }
};

// Login route Controller
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(403).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    res
      .status(200)
      .json({ message: "User logged in successfully", data: user, token });
  } catch (error) {
    console.log(error);
    res.status(error?.status || 500).json({ error: error.message });
  }
};

// Logout route Controller
export const logoutUserController = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logout successful" });
};

// profileUserController.js
export const profileUserController = (req, res) => {
  try {
    res.status(200).json({
      message: "User is authenticated",
      user: req.user,
    });
  } catch (error) {
    console.error("Error checking authentication:", error);
    res.status(500).json({ message: "Error checking authentication" });
  }
};
