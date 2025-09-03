import { Router } from "express";
import { requestOTP, verifyOTP } from "../controller/auth.controller";

const authRoutes = Router();

authRoutes.post("/request-otp", requestOTP);
authRoutes.post("/verify-otp", verifyOTP);

export default authRoutes;
