import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Phone, Lock, User, MapPin, Building } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import wardsData from "../../docs/jalingo_wards.json";

interface AuthFormsProps {
  onSuccess: () => void;
}

export const AuthForms: React.FC<AuthFormsProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    businessAddress: "",
    customerCategory: "individuals" as "offices" | "stores" | "individuals",
    businessName: "",
    wardCode: "",
    wardName: "",
    subArea: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { login, register, isLoading } = useAuth();

  const wardOptions = (wardsData as any).wards as Array<{
    name: string;
    code: string;
    sub_areas: string[];
  }>;
  const selectedWard = useMemo(
    () => wardOptions.find((w) => w.code === formData.wardCode),
    [wardOptions, formData.wardCode]
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!isLogin) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
      if (!formData.businessAddress.trim()) {
        newErrors.businessAddress = "Business/Delivery address is required";
      }
      if (!formData.businessName.trim()) {
        newErrors.businessName = "Business/Shop name is required";
      }
      if (!formData.wardCode) {
        newErrors.wardCode = "Ward is required";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^(\+234|0)[789]\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid Nigerian phone number";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isLogin) {
        await login(formData.phoneNumber, formData.password);
      } else {
        await register({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          businessAddress: formData.businessAddress,
          customerCategory: formData.customerCategory,
          businessName: formData.businessName,
          wardCode: formData.wardCode,
          wardName: selectedWard?.name,
          subArea: formData.subArea,
        });
      }
      onSuccess();
    } catch (error) {
      setErrors({ submit: (error as Error).message });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-white font-bold text-2xl">💧</span>
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? "Welcome Back" : "Join AquaFlow"}
            </h1>
            <p className="text-gray-600 text-sm">
              {isLogin
                ? "Sign in to your account to continue"
                : "Create your account for beverage delivery in Jalingo"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className={`input-field pl-10 ${
                        errors.fullName ? "border-red-300" : ""
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business/Shop Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) =>
                        handleInputChange("businessName", e.target.value)
                      }
                      className={`input-field pl-10 ${
                        errors.businessName ? "border-red-300" : ""
                      }`}
                      placeholder="e.g., Aliyu Provision Store"
                    />
                  </div>
                  {errors.businessName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.businessName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ward
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={formData.wardCode}
                      onChange={(e) =>
                        handleInputChange("wardCode", e.target.value)
                      }
                      className={`input-field pl-10 ${
                        errors.wardCode ? "border-red-300" : ""
                      }`}
                    >
                      <option value="">Select Ward</option>
                      {wardOptions.map((w) => (
                        <option key={w.code} value={w.code}>
                          {w.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.wardCode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.wardCode}
                    </p>
                  )}
                </div>

                {selectedWard && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sub-area (optional)
                    </label>
                    <select
                      value={formData.subArea}
                      onChange={(e) =>
                        handleInputChange("subArea", e.target.value)
                      }
                      className="input-field"
                    >
                      <option value="">Select Sub-area</option>
                      {selectedWard.sub_areas.map((sa) => (
                        <option key={sa} value={sa}>
                          {sa}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business/Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.businessAddress}
                      onChange={(e) =>
                        handleInputChange("businessAddress", e.target.value)
                      }
                      className={`input-field pl-10 ${
                        errors.businessAddress ? "border-red-300" : ""
                      }`}
                      placeholder="Street, landmark"
                    />
                  </div>
                  {errors.businessAddress && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.businessAddress}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Category
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={formData.customerCategory}
                      onChange={(e) =>
                        handleInputChange("customerCategory", e.target.value)
                      }
                      className="input-field pl-10 appearance-none"
                    >
                      <option value="individuals">
                        Individuals/Households
                      </option>
                      <option value="offices">Offices & Businesses</option>
                      <option value="stores">Provision Stores</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className={`input-field pl-10 ${
                    errors.phoneNumber ? "border-red-300" : ""
                  }`}
                  placeholder="08012345678"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`input-field pl-10 pr-10 ${
                    errors.password ? "border-red-300" : ""
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className={`input-field pl-10 pr-10 ${
                        errors.confirmPassword ? "border-red-300" : ""
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </>
            )}

            {errors.submit && (
              <p className="text-red-500 text-sm text-center">
                {errors.submit}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Please wait..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </motion.button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary-600 font-medium ml-1 hover:text-primary-700"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-primary-600 text-sm hover:text-primary-700">
                Forgot password?
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
