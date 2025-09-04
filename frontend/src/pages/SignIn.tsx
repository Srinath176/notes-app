import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { requestOtp, verifyOtp } from "../api/auth";
import { Loader } from "lucide-react";

export default function Signin() {
  const [step, setStep] = useState<"form" | "otp">("form");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    remember: false,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRequestOtp = async () => {
    if (!formData.email) {
      toast.error("Email is required");
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
      const res = await verifyOtp(formData.email, formData.otp, "login");
      const token = res.data.token;
      if (formData.remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      toast.success("Login successful");
      navigate("/dashboard");
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
            <div className="h-6 w-6 rounded-full text-blue-500 mr-2"><Loader /></div>
            <span className="text-xl font-semibold">HD</span>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-center md:text-left">Sign in</h2>
          <p className="text-gray-500 mb-6 text-center md:text-left">
            Please login to continue
          </p>

          {/* Step 1 */}
          {step === "form" && (
            <>
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
              <p
                className="text-sm text-blue-600 cursor-pointer mb-3"
                onClick={handleRequestOtp}
              >
                Resend OTP
              </p>
              <label className="flex items-center mb-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="mr-2"
                />
                Keep me logged in
              </label>
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="bg-blue-600 text-white py-2 rounded-lg w-full hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Sign In"}
              </button>
            </>
          )}

          <p className="mt-4 text-gray-600 text-sm text-center md:text-left">
            Need an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create one
            </Link>
          </p>
        </div>

        {/* Right Section (hidden on mobile) */}
        <div className="hidden md:block w-1/2">
          <img src="/right-column.png" alt="Signin" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}
