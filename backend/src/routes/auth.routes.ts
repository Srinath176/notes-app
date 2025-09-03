import { Router } from "express";
import { getUser, requestOtp, verifyOtp } from "../controller/auth.controller";


const authRoutes = Router();

authRoutes.post("/request-otp", requestOtp);
authRoutes.post("/verify-otp", verifyOtp);
authRoutes.get('/user', getUser)

export default authRoutes;
