import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Building,
  Edit3,
  LogOut,
  Package,
  ChevronRight,
  KeyRound,
  Trash2,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { usePin } from "../contexts/PinContext";

interface ProfilePageProps {
  onBack: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  const { user, logout } = useAuth();
  const { hasPin, changePin, clearPin, setPin } = usePin();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: user?.fullName || "",
    phoneNumber: user?.phoneNumber || "",
    businessAddress: user?.businessAddress || "",
    customerCategory: user?.customerCategory || "individuals",
  });
  const [pinForm, setPinForm] = useState({
    oldPin: "",
    newPin: "",
    confirm: "",
  });
  const [pinMsg, setPinMsg] = useState<string | null>(null);

  const handleSave = () => {
    // In a real app, this would update the user data
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "offices":
        return "Offices & Businesses";
      case "stores":
        return "Provision Stores";
      case "individuals":
        return "Individuals/Households";
      default:
        return category;
    }
  };

  const mockOrders = [
    { id: "1", date: "2024-01-15", total: 2500, status: "delivered" },
    { id: "2", date: "2024-01-10", total: 1800, status: "delivered" },
    { id: "3", date: "2024-01-05", total: 3200, status: "delivered" },
  ];

  const submitPinChange = async () => {
    setPinMsg(null);
    if (!/^\d{4,6}$/.test(pinForm.newPin)) {
      setPinMsg("New PIN must be 4-6 digits");
      return;
    }
    if (pinForm.newPin !== pinForm.confirm) {
      setPinMsg("New PIN and confirm do not match");
      return;
    }
    if (hasPin) {
      const ok = await changePin(pinForm.oldPin, pinForm.newPin);
      setPinMsg(ok ? "PIN changed successfully" : "Old PIN is incorrect");
    } else {
      try {
        await setPin(pinForm.newPin);
        setPinMsg("PIN set successfully");
      } catch (e: any) {
        setPinMsg(e?.message || "Failed to set PIN");
      }
    }
    setPinForm({ oldPin: "", newPin: "", confirm: "" });
  };

  const removePin = () => {
    clearPin();
    setPinMsg("PIN cleared");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Edit3 className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.fullName}
              </h2>
              <p className="text-gray-600 text-sm">
                {getCategoryLabel(user?.customerCategory || "")}
              </p>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editData.fullName}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editData.phoneNumber}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Address
                </label>
                <input
                  type="text"
                  value={editData.businessAddress}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      businessAddress: e.target.value,
                    }))
                  }
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Category
                </label>
                <select
                  value={editData.customerCategory}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      customerCategory: e.target.value as any,
                    }))
                  }
                  className="input-field"
                >
                  <option value="individuals">Individuals/Households</option>
                  <option value="offices">Offices & Businesses</option>
                  <option value="stores">Provision Stores</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="btn-primary flex-1"
                >
                  Save Changes
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{user?.phoneNumber}</span>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{user?.businessAddress}</span>
              </div>

              <div className="flex items-center space-x-3">
                <Building className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">
                  {getCategoryLabel(user?.customerCategory || "")}
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* PIN Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <KeyRound className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold text-gray-900">Transaction PIN</h3>
            </div>
            {hasPin && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={removePin}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Clear</span>
              </motion.button>
            )}
          </div>

          <div className="space-y-3">
            {hasPin && (
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Current PIN"
                value={pinForm.oldPin}
                onChange={(e) =>
                  setPinForm((p) => ({
                    ...p,
                    oldPin: e.target.value.replace(/\D/g, ""),
                  }))
                }
                className="input-field"
              />
            )}
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={
                hasPin ? "New PIN (4-6 digits)" : "Set PIN (4-6 digits)"
              }
              value={pinForm.newPin}
              onChange={(e) =>
                setPinForm((p) => ({
                  ...p,
                  newPin: e.target.value.replace(/\D/g, ""),
                }))
              }
              className="input-field"
            />
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Confirm PIN"
              value={pinForm.confirm}
              onChange={(e) =>
                setPinForm((p) => ({
                  ...p,
                  confirm: e.target.value.replace(/\D/g, ""),
                }))
              }
              className="input-field"
            />

            {pinMsg && <p className="text-sm text-gray-600">{pinMsg}</p>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={submitPinChange}
              className="btn-primary w-full"
            >
              {hasPin ? "Change PIN" : "Set PIN"}
            </motion.button>
          </div>
        </motion.div>

        {/* Order History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Order History</h3>
            <Package className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-3">
            {mockOrders.map((order) => (
              <motion.div
                key={order.id}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer"
              >
                <div>
                  <p className="font-medium text-gray-900">Order #{order.id}</p>
                  <p className="text-gray-600 text-sm">{order.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₦{order.total.toLocaleString()}
                    </p>
                    <p className="text-green-600 text-sm capitalize">
                      {order.status}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-2xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
