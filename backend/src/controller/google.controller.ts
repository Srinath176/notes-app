import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model";
import jwt from "jsonwebtoken";


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//google signin setup
export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    console.log('token', token)
    if (!token) return res.status(400).json({ message: "Token missing" });

    // Verify token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "681018934772-al47e0htgnraskl9t01lgc86hmc2vch8.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    if (!payload) return res.status(400).json({ message: "Invalid token" });

    console.log('payload', payload)
    const { email, name } = payload;

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        provider: "google",
      });
      await user.save();
    }

    // Generate JWT
    const appToken = jwt.sign({ id: user._id }, "notessecret", {
      expiresIn: "1h",
    });

    return res.json({
      message: "Google Auth successful",
      token: appToken,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Google Auth Error:", err)
    return res.status(500).json({ message: "Google Auth failed", error: err });
  }
};
