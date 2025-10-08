import React, { useState } from "react";
import { User, MapPin, Building } from "lucide-react";
import BaseModal from "./BaseModal";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSave: (data: any) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    businessName: user?.businessName || "",
    customerCategory: user?.customerCategory || "",
    businessAddress: user?.businessAddress || "",
    ward: user?.ward || "",
    subArea: user?.subArea || "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }
    if (!formData.customerCategory.trim()) {
      newErrors.customerCategory = "Customer category is required";
    }
    if (!formData.businessAddress.trim()) {
      newErrors.businessAddress = "Business address is required";
    }
    if (!formData.ward.trim()) {
      newErrors.ward = "Ward is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Profile" size="lg">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-primary-950 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Business Name
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, businessName: e.target.value }))
            }
            className={`input-field ${
              errors.businessName ? "border-red-500" : ""
            }`}
            placeholder="Enter your business name"
          />
          {errors.businessName && (
            <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-950 mb-2">
            <Building className="w-4 h-4 inline mr-2" />
            Customer Category
          </label>
          <select
            value={formData.customerCategory}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                customerCategory: e.target.value,
              }))
            }
            className={`input-field ${
              errors.customerCategory ? "border-red-500" : ""
            }`}
          >
            <option value="">Select category</option>
            <option value="Retailer">Retailer</option>
            <option value="Wholesaler">Wholesaler</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Hotel">Hotel</option>
            <option value="Supermarket">Supermarket</option>
          </select>
          {errors.customerCategory && (
            <p className="text-red-500 text-sm mt-1">
              {errors.customerCategory}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-950 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Business Address
          </label>
          <input
            type="text"
            value={formData.businessAddress}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                businessAddress: e.target.value,
              }))
            }
            className={`input-field ${
              errors.businessAddress ? "border-red-500" : ""
            }`}
            placeholder="Enter your business address"
          />
          {errors.businessAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.businessAddress}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary-950 mb-2">
              Ward
            </label>
            <input
              type="text"
              value={formData.ward}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, ward: e.target.value }))
              }
              className={`input-field ${errors.ward ? "border-red-500" : ""}`}
              placeholder="Enter ward"
            />
            {errors.ward && (
              <p className="text-red-500 text-sm mt-1">{errors.ward}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-950 mb-2">
              Sub Area
            </label>
            <input
              type="text"
              value={formData.subArea}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subArea: e.target.value }))
              }
              className="input-field"
              placeholder="Enter sub area"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex-1"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default EditProfileModal;
