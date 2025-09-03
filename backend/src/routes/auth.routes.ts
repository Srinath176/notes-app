import { Router } from "express";
import { requestOtp, verifyOtp } from "../controller/auth.controller";


const authRoutes = Router();

authRoutes.post("/request-otp", requestOtp);
authRoutes.post("/verify-otp", verifyOtp);

export default authRoutes;
