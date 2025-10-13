import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    pin: "",
  });
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data - in real app, this would come from API
      const mockUser = {
        id: "1",
        businessName: "Masakai",
        businessAddress: "123 Demo Street, Jalingo",
        ward: "Abbare Yelwa",
        subArea: "Abbare",
        customerCategory: "Office" as const,
        phoneNumber: formData.phoneNumber,
        beverCode: "JAL-01-OF-0001",
        verificationStatus: "Verified" as const,
        createdAt: new Date(),
        hasPin: true,
      };

      login(mockUser);
      navigate("/home");
    } catch (err) {
      setError("Invalid phone number or PIN");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <img
              src="/favicon.png"
              alt="Bever logo"
              className="w-10 h-10 rounded-sm"
            />
            <h1 className="text-4xl font-bold text-primary-950">Bever</h1>
          </div>
          <p className="text-primary-600">Premium beverages delivered</p>
        </motion.div>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto"
        >
          {/* <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-primary-950 mb-2">
              Welcome back
            </h2>
            <p className="text-primary-600">Sign in to your account</p>
          </div> */}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="08012345678"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                Transaction PIN
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                <input
                  type={showPin ? "text" : "password"}
                  name="pin"
                  value={formData.pin}
                  onChange={handleInputChange}
                  placeholder="Enter your PIN"
                  className="input-field pl-12 pr-12"
                  maxLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-600"
                >
                  {showPin ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border border-red-200 rounded-xl"
              >
                <p className="text-red-600 text-sm">{error}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-primary-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary-950 font-medium hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
      {/* Admin link - fixed bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary-100 px-6 py-3 z-20">
        <div className="max-w-md mx-auto text-center">
          <Link
            to="/admin/login"
            className="text-sm text-primary-950 font-medium hover:underline"
          >
            Admin? Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
