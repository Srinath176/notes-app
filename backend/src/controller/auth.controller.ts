import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { sendOTP } from "../utils/sendMail";
import crypto from "crypto";

//otp store for development purpose
const otpStore: { [email: string]: { otp: string; expires: number } } = {};

//  Request OTP
export const requestOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = crypto.randomInt(100000, 900000).toString(); // create 6 digit otp number
    otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // 5 minute otp expiry

    await sendOTP(email, otp);
    return res.json({ message: "OTP sent successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error sending OTP" });
  }
};

//  Verify OTP
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp, mode, name, dob } = req.body;
    if (!email || !otp || !mode) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const stored = otpStore[email];
    if (!stored || stored.otp !== otp || stored.expires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    let user = await User.findOne({ email });

    if (mode === "signup") {
      if (user) return res.status(400).json({ message: "User already exists" });
      user = new User({ name, dob, email, provider: "email" });
      await user.save();
    } else if (mode === "login") {
      if (!user) return res.status(400).json({ message: "User not found" });
    }

    // Clear OTP after use
    delete otpStore[email];

    const token = jwt.sign({ id: user?._id }, "notessecret", {
      expiresIn: "1h",
    });

    return res.json({
      message: `${mode === "signup" ? "Signup" : "Login"} successful`,
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error verifying OTP" });
  }
};

//get user information/data
export const getUser = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    const user = await User.findById(req.userId).select("name email");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching user" });
  }
};
