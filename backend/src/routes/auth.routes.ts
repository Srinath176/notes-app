import { Router } from "express";
import { getUser, requestOtp, verifyOtp } from "../controller/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { googleAuth } from "../controller/google.controller";


const authRoutes = Router();

authRoutes.post("/request-otp", requestOtp);
authRoutes.post("/verify-otp", verifyOtp);
authRoutes.get("/user",authMiddleware, getUser)

//google
authRoutes.post("/google", googleAuth)

export default authRoutes;
