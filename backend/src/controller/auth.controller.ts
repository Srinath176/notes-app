import { Request, Response } from "express";
import User from "../models/user.model";
import { sendOTP } from "../utils/sendMail";

// In-memory OTP store for development purpose
const otpStore: { [key: string]: { otp: string; expiresAt: number } } = {};

/**
 * Request OTP Controller
 */
export const requestOTP = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, dob, email } = req.body;

    if (!name || !dob || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); //6 digit otp
    otpStore[email] = { otp, expiresAt: Date.now() + 3 * 60 * 1000 }; // valid 3 min

    await sendOTP(email, otp);

    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("OTP request failed:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Verify OTP Controller
 */
export const verifyOTP = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, dob, email, otp } = req.body;

    if (!otpStore[email]) {
      return res.status(400).json({ message: "OTP not requested or expired" });
    }

    const { otp: storedOtp, expiresAt } = otpStore[email];

    if (Date.now() > expiresAt) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP expired" });
    }

    if (storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Save user in DB
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, dob, email, isVerified: true });
      await user.save();
    } else {
      user.isVerified = true;
      await user.save();
    }

    delete otpStore[email];
    return res.status(201).json({ message: "Signup successful", user });
  } catch (error) {
    console.error("OTP verification failed:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
