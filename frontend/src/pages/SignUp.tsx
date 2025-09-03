import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { requestOtp, verifyOtp } from "../api/auth";

export default function Signup() {
  const [step, setStep] = useState<"form" | "otp">("form");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    otp: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRequestOtp = async () => {
    if (!formData.name || !formData.dob || !formData.email) {
      toast.error("All fields are required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid email format");
      return;
    }
    setLoading(true);
    try {
      await requestOtp(formData.email);
      toast.success("OTP sent to your email");
      setStep("otp");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp) {
      toast.error("Please enter OTP");
      return;
    }
    setLoading(true);
    try {
      await verifyOtp(
        formData.email,
        formData.otp,
        "signup",
        formData.name,
        formData.dob
      );
      toast.success("Signup successful! Please login");
      navigate("/signin");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col md:flex-row w-full md:w-[900px] max-w-5xl overflow-hidden rounded-2xl shadow-lg bg-white">
        {/* Left Section */}
        <div className="flex flex-col w-full md:w-1/2 p-8 md:p-10 justify-center">
          {/* Logo */}
          <div className="flex items-center justify-center md:justify-start mb-6">
            <div className="h-6 w-6 rounded-full bg-blue-600 animate-spin mr-2"></div>
            <span className="text-xl font-semibold">HD</span>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-center md:text-left">Sign up</h2>
          <p className="text-gray-500 mb-6 text-center md:text-left">
            Sign up to enjoy the features of HD
          </p>

          {/* Step 1 */}
          {step === "form" && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="mb-3 p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="mb-3 p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="mb-3 p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleRequestOtp}
                disabled={loading}
                className="bg-blue-600 text-white py-2 rounded-lg w-full hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Get OTP"}
              </button>
            </>
          )}

          {/* Step 2 */}
          {step === "otp" && (
            <>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                className="mb-3 p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="bg-blue-600 text-white py-2 rounded-lg w-full hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Sign Up"}
              </button>
            </>
          )}

          <p className="mt-4 text-gray-600 text-sm text-center md:text-left">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Section (hidden on mobile) */}
        <div className="hidden md:block w-1/2">
          <img src="/right-column.png" alt="Signup" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}
