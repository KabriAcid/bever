import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Building,
  MapPin,
  Phone,
  Camera,
  Check,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import wardsData from "../data/jalingo_wards.json";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    businessAddress: "",
    ward: "",
    subArea: "",
    customerCategory: "",
    phoneNumber: "",
    shopPhoto: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset sub area when ward changes
    if (name === "ward") {
      setFormData((prev) => ({ ...prev, subArea: "" }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, shopPhoto: file }));
    }
  };

  const generateBeverCode = () => {
    const wardIndex =
      wardsData.wards.findIndex((w) => w.name === formData.ward) + 1;
    const wardCode = wardIndex.toString().padStart(2, "0");
    const categoryCode =
      formData.customerCategory === "Office"
        ? "OF"
        : formData.customerCategory === "Provision Store"
        ? "PS"
        : "HM";
    const customerId = Math.floor(Math.random() * 9999) + 1;
    return `JAL-${wardCode}-${categoryCode}-${customerId
      .toString()
      .padStart(4, "0")}`;
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const beverCode = generateBeverCode();
      const newUser = {
        id: Date.now().toString(),
        businessName: formData.businessName,
        businessAddress: formData.businessAddress,
        ward: formData.ward,
        subArea: formData.subArea,
        customerCategory: formData.customerCategory as
          | "Office"
          | "Provision Store"
          | "Home",
        phoneNumber: formData.phoneNumber,
        beverCode,
        verificationStatus: "Pending" as const,
        shopPhoto: formData.shopPhoto
          ? URL.createObjectURL(formData.shopPhoto)
          : undefined,
        createdAt: new Date(),
        hasPin: false,
      };

      login(newUser);
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.businessName &&
          formData.businessAddress &&
          formData.ward &&
          formData.customerCategory &&
          formData.phoneNumber
        );
      case 2:
        return formData.shopPhoto;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const selectedWard = wardsData.wards.find((w) => w.name === formData.ward);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-primary-100 px-6 py-4 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={currentStep === 1 ? () => navigate("/login") : prevStep}
            className="p-2 hover:bg-primary-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-primary-700" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-primary-950">Register</h1>
            <p className="text-sm text-primary-600">Step {currentStep} of 3</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Progress Bar */}
        <div className="mt-4 bg-primary-100 rounded-full h-2">
          <motion.div
            className="bg-primary-950 h-2 rounded-full"
            initial={{ width: "33%" }}
            animate={{ width: `${(currentStep / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="px-6 py-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-primary-950 mb-2">
                  Business Information
                </h2>
                <p className="text-primary-600">Tell us about your business</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Business/Shop Name *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Enter business name"
                      className="input-field pl-12"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Business Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-primary-400" />
                    <textarea
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleInputChange}
                      placeholder="Street address, landmark"
                      className="input-field pl-12 min-h-[80px] resize-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Ward *
                    </label>
                    <select
                      name="ward"
                      value={formData.ward}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select Ward</option>
                      {wardsData.wards.map((ward) => (
                        <option key={ward.code} value={ward.name}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Sub Area
                    </label>
                    <select
                      name="subArea"
                      value={formData.subArea}
                      onChange={handleInputChange}
                      className="input-field"
                      disabled={!selectedWard}
                    >
                      <option value="">Select Sub Area</option>
                      {selectedWard?.sub_areas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Customer Category *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Office", "Provision Store", "Home"].map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            customerCategory: category,
                          }))
                        }
                        className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          formData.customerCategory === category
                            ? "border-primary-950 bg-primary-950 text-white"
                            : "border-primary-200 text-primary-700 hover:border-primary-300"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Phone Number *
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
              </div>
            </motion.div>
          )}

          {/* Step 2: Shop Photo */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-primary-950 mb-2">
                  Shop Photo
                </h2>
                <p className="text-primary-600">
                  Upload a clear photo of your shop's entrance or facade
                </p>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-primary-200 rounded-2xl p-8 text-center">
                  {formData.shopPhoto ? (
                    <div className="space-y-4">
                      <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-10 h-10 text-accent-600" />
                      </div>
                      <div>
                        <p className="font-medium text-primary-950">
                          Photo uploaded successfully
                        </p>
                        <p className="text-sm text-primary-600">
                          {formData.shopPhoto.name}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, shopPhoto: null }))
                        }
                        className="btn-secondary"
                      >
                        Change Photo
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                        <Camera className="w-10 h-10 text-primary-400" />
                      </div>
                      <div>
                        <p className="font-medium text-primary-950 mb-2">
                          Upload Shop Photo
                        </p>
                        <p className="text-sm text-primary-600 mb-4">
                          Take a clear photo showing your shop's building or
                          entrance
                        </p>
                        <label className="btn-primary cursor-pointer">
                          Choose Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-accent-50 border border-accent-200 rounded-xl p-4">
                  <h4 className="font-medium text-accent-800 mb-2">
                    Photo Guidelines:
                  </h4>
                  <ul className="text-sm text-accent-700 space-y-1">
                    <li>• Ensure the shop name/signage is visible</li>
                    <li>• Take the photo during daylight for clarity</li>
                    <li>• Include the full entrance or facade</li>
                    <li>• Avoid blurry or dark images</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-primary-950 mb-2">
                  Review Information
                </h2>
                <p className="text-primary-600">
                  Please review your information before submitting
                </p>
              </div>

              <div className="card space-y-4">
                <div>
                  <h3 className="font-medium text-primary-950 mb-3">
                    Business Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-primary-600">Business Name:</span>
                      <span className="text-primary-950 font-medium">
                        {formData.businessName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-600">Category:</span>
                      <span className="text-primary-950 font-medium">
                        {formData.customerCategory}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-600">Ward:</span>
                      <span className="text-primary-950 font-medium">
                        {formData.ward}
                      </span>
                    </div>
                    {formData.subArea && (
                      <div className="flex justify-between">
                        <span className="text-primary-600">Sub Area:</span>
                        <span className="text-primary-950 font-medium">
                          {formData.subArea}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-primary-600">Phone:</span>
                      <span className="text-primary-950 font-medium">
                        {formData.phoneNumber}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-primary-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600">Shop Photo:</span>
                    <span className="text-accent-600 font-medium">
                      ✓ Uploaded
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                <h4 className="font-medium text-primary-950 mb-2">
                  What happens next?
                </h4>
                <ul className="text-sm text-primary-700 space-y-1">
                  <li>• You'll receive a unique Bever Code</li>
                  <li>• Your account will be pending verification</li>
                  <li>• You can start browsing and ordering immediately</li>
                  <li>• Verification typically takes 24-48 hours</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary-100 p-6">
          <button
            onClick={nextStep}
            disabled={!isStepValid() || isLoading}
            className="btn-primary w-full"
          >
            {isLoading
              ? "Creating Account..."
              : currentStep === 3
              ? "Create Account"
              : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
