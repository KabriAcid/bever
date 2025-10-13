import React, { useState } from "react";
import { Bell, Globe, Shield, Truck } from "lucide-react";
import BaseModal from "./BaseModal";
import type { ProfileSettings } from "../types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ProfileSettings;
  onSave: (settings: ProfileSettings) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [formData, setFormData] = useState<ProfileSettings>(settings);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Settings & Preferences"
      size="lg"
    >
      <div className="space-y-6">
        {/* Notifications */}
        <div>
          <h4 className="flex items-center gap-2 font-medium text-primary-950 mb-3">
            <Bell className="w-5 h-5" />
            Notifications
          </h4>
          <div className="space-y-3">
            {(
              Object.entries(formData.notifications) as Array<
                [keyof typeof formData.notifications, boolean]
              >
            ).map(([key, value]) => (
              <label
                key={String(key)}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-primary-700">
                  {key === "orderUpdates" && "Order Updates"}
                  {key === "promotions" && "Promotions & Offers"}
                  {key === "deliveryAlerts" && "Delivery Alerts"}
                </span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setFormData((prev: ProfileSettings) => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          [key]: e.target.checked,
                        },
                      }))
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-10 h-6 rounded-full transition-colors ${
                      value ? "bg-accent" : "bg-primary-200"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${
                        value ? "translate-x-5" : "translate-x-1"
                      } mt-1`}
                    />
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* App Preferences */}
        <div>
          <h4 className="flex items-center gap-2 font-medium text-primary-950 mb-3">
            <Globe className="w-5 h-5" />
            App Preferences
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-primary-700 mb-2">
                Language
              </label>
              <select
                value={formData.app.language}
                onChange={(e) =>
                  setFormData((prev: ProfileSettings) => ({
                    ...prev,
                    app: { ...prev.app, language: e.target.value },
                  }))
                }
                className="input-field"
              >
                <option value="en">English</option>
                <option value="ha">Hausa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-primary-700 mb-2">
                Default Delivery Time
              </label>
              <select
                value={formData.app.defaultDeliveryTime}
                onChange={(e) =>
                  setFormData((prev: ProfileSettings) => ({
                    ...prev,
                    app: { ...prev.app, defaultDeliveryTime: e.target.value },
                  }))
                }
                className="input-field"
              >
                <option value="morning">Morning (8AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 6PM)</option>
                <option value="evening">Evening (6PM - 9PM)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div>
          <h4 className="flex items-center gap-2 font-medium text-primary-950 mb-3">
            <Shield className="w-5 h-5" />
            Privacy
          </h4>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm text-primary-700">
                Profile Visibility
              </span>
              <select
                value={formData.privacy.profileVisibility}
                onChange={(e) =>
                  setFormData((prev: ProfileSettings) => ({
                    ...prev,
                    privacy: {
                      ...prev.privacy,
                      profileVisibility: e.target.value as "public" | "private",
                    },
                  }))
                }
                className="input-field w-32"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-primary-700">Data Sharing</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formData.privacy.dataSharing}
                  onChange={(e) =>
                    setFormData((prev: ProfileSettings) => ({
                      ...prev,
                      privacy: {
                        ...prev.privacy,
                        dataSharing: e.target.checked,
                      },
                    }))
                  }
                  className="sr-only"
                />
                <div
                  className={`w-10 h-6 rounded-full transition-colors ${
                    formData.privacy.dataSharing
                      ? "bg-accent"
                      : "bg-primary-200"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${
                      formData.privacy.dataSharing
                        ? "translate-x-5"
                        : "translate-x-1"
                    } mt-1`}
                  />
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Delivery Preferences */}
        <div>
          <h4 className="flex items-center gap-2 font-medium text-primary-950 mb-3">
            <Truck className="w-5 h-5" />
            Delivery Preferences
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-primary-700 mb-2">
                Default Address
              </label>
              <input
                type="text"
                value={formData.delivery.defaultAddress}
                onChange={(e) =>
                  setFormData((prev: ProfileSettings) => ({
                    ...prev,
                    delivery: {
                      ...prev.delivery,
                      defaultAddress: e.target.value,
                    },
                  }))
                }
                className="input-field"
                placeholder="Enter default delivery address"
              />
            </div>
            <div>
              <label className="block text-sm text-primary-700 mb-2">
                Special Instructions
              </label>
              <textarea
                value={formData.delivery.specialInstructions}
                onChange={(e) =>
                  setFormData((prev: ProfileSettings) => ({
                    ...prev,
                    delivery: {
                      ...prev.delivery,
                      specialInstructions: e.target.value,
                    },
                  }))
                }
                className="input-field"
                rows={3}
                placeholder="Any special delivery instructions..."
              />
            </div>
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
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default SettingsModal;
