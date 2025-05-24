import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(401).json({
        message: "All fields are required",
        status: "error",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "User already exists",
        status: "error",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    return res.status(401).json({
      message: "Account created successfully",
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!userName || !password) {
      return res.status(401).json({
        message: "All fields are required",
        status: "error",
      });
    }
    let user = await User.find({ userName });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect username or password",
        status: "error",
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Incorrect username or password",
        status: "error",
      });
    }

    
  } catch (error) {
    console.log(error);
  }
};
