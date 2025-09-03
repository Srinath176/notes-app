import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

//request otp
export const requestOtp = (email: string) =>
  API.post("/auth/request-otp", { email });

//verify otp
export const verifyOtp = (
  email: string,
  otp: string,
  mode: "signup" | "login",
  name?: string,
  dob?: string
) =>
  API.post("/auth/verify-otp", {
    email,
    otp,
    mode,
    name,
    dob,
  });
