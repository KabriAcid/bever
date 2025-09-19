import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Phone,
  Shield,
  Camera,
  Edit3,
  LogOut,
  Copy,
  Check,
  Lock,
  Eye,
  EyeOff,
  Settings,
  Share2,
  HelpCircle,
  Star,
  Gift,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { usePin } from "../contexts/PinContext";
import EditProfileModal from "../components/modals/EditProfileModal";
import PhotoUploadModal from "../components/modals/PhotoUploadModal";
import SettingsModal from "../components/modals/SettingsModal";
import LogoutConfirmModal from "../components/modals/LogoutConfirmModal";
import BaseModal from "../components/modals/BaseModal";
import ProfileCompletionComponent from "../components/ProfileCompletion";
import type { ProfileSettings, ProfileCompletion } from "../types";

const ProfilePage: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const { hasPin, setPin, verifyPin, changePin } = usePin();

  // Modal states
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showCoverPhoto, setShowCoverPhoto] = useState(false);
  const [showAvatarPhoto, setShowAvatarPhoto] = useState(false);
  const [showShopPhoto, setShowShopPhoto] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  // Component states
  const [copied, setCopied] = useState(false);
  const [pinAction, setPinAction] = useState<"set" | "change">("set");
  const [pinForm, setPinForm] = useState({
    currentPin: "",
    newPin: "",
    confirmPin: "",
    showPins: false,
  });
  const [pinError, setPinError] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  // Mock data - replace with real data
  const [settings, setSettings] = useState<ProfileSettings>({
    notifications: {
      orderUpdates: true,
      promotions: true,
      deliveryAlerts: true,
    },
    app: {
      theme: "light",
      language: "en",
      defaultDeliveryTime: "morning",
    },
    privacy: {
      profileVisibility: "public",
      dataSharing: false,
    },
    delivery: {
      defaultAddress: user?.businessAddress || "",
      specialInstructions: "",
    },
  });

  const profileCompletion: ProfileCompletion = {
    percentage: 85,
    missingFields: ["Shop Photo", "Cover Photo"],
    completedSections: ["Business Info", "Contact", "Verification"],
  };

  const handleCopyCode = () => {
    if (user?.beverCode) {
      navigator.clipboard.writeText(user.beverCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const getVerificationBadge = () => {
    switch (user?.verificationStatus) {
      case "Verified":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent-100 text-accent-700 text-sm font-medium rounded-full">
            <Check className="w-4 h-4" />
            Verified
          </span>
        );
      case "Agent Visit":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
            <Shield className="w-4 h-4" />
            Agent Visit
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
            <Shield className="w-4 h-4" />
            Pending
          </span>
        );
    }
  };

  const openPinModal = (action: "set" | "change") => {
    setPinAction(action);
    setShowPinModal(true);
    setPinForm({
      currentPin: "",
      newPin: "",
      confirmPin: "",
      showPins: false,
    });
    setPinError("");
  };

  const getPinStrength = (pin: string) => {
    if (pin.length < 4) return "weak";
    if (pin.length < 6) return "medium";
    return "strong";
  };

  const renderPinStrengthIndicator = () => {
    if (pinAction === "set" || pinAction === "change") {
      const strength = getPinStrength(pinForm.newPin);
      const colors = {
        weak: "bg-red-500",
        medium: "bg-orange-500",
        strong: "bg-accent-500",
      };

      return (
        <div className="mt-2">
          <div className="flex gap-1 mb-1">
            <div
              className={`h-2 flex-1 rounded ${
                strength === "weak" ? colors.weak : "bg-primary-200"
              }`}
            />
            <div
              className={`h-2 flex-1 rounded ${
                strength === "medium" || strength === "strong"
                  ? colors[strength]
                  : "bg-primary-200"
              }`}
            />
            <div
              className={`h-2 flex-1 rounded ${
                strength === "strong" ? colors.strong : "bg-primary-200"
              }`}
            />
          </div>
          <p className="text-xs text-primary-600">
            PIN Strength: {strength.charAt(0).toUpperCase() + strength.slice(1)}
          </p>
        </div>
      );
    }
    return null;
  };

  const handlePinSubmit = () => {
    setPinError("");

    if (pinAction === "set") {
      if (pinForm.newPin.length < 4) {
        setPinError("PIN must be at least 4 digits");
        return;
      }
      if (pinForm.newPin !== pinForm.confirmPin) {
        setPinError("PINs do not match");
        return;
      }
      setPin(pinForm.newPin);
      setShowPinModal(false);
    } else if (pinAction === "change") {
      if (!verifyPin(pinForm.currentPin)) {
        setPinError("Current PIN is incorrect");
        return;
      }
      if (pinForm.newPin.length < 4) {
        setPinError("New PIN must be at least 4 digits");
        return;
      }
      if (pinForm.newPin !== pinForm.confirmPin) {
        setPinError("New PINs do not match");
        return;
      }
      if (changePin(pinForm.currentPin, pinForm.newPin)) {
        setShowPinModal(false);
      } else {
        setPinError("Failed to change PIN");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Cover Photo Section */}
      <div className="relative">
        <div
          className="h-48 bg-gradient-to-br from-primary-900 to-primary-950 relative overflow-hidden"
          style={{
            backgroundImage: user?.coverPhoto
              ? `url(${user.coverPhoto})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {user?.coverPhoto && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          )}
          <button
            onClick={() => setShowCoverPhoto(true)}
            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Avatar */}
        <div className="absolute -bottom-16 left-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
              <div className="w-full h-full bg-primary-100 rounded-full flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-primary-600" />
                )}
              </div>
            </div>
            <button
              onClick={() => setShowAvatarPhoto(true)}
              className="absolute -bottom-1 -right-1 p-2 bg-accent-500 text-white rounded-full shadow-lg hover:bg-accent-600 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-20 px-6 pb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-primary-950 mb-1">
              {user?.businessName}
            </h1>
            <p className="text-primary-600 mb-2">{user?.customerCategory}</p>
            {getVerificationBadge()}
          </div>
          <button
            onClick={() => setShowEditProfile(true)}
            className="p-2 text-primary-600 hover:text-primary-950 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <Edit3 className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-primary-50 rounded-xl">
            <div className="text-2xl font-bold text-primary-950">127</div>
            <div className="text-xs text-primary-600">Orders</div>
          </div>
          <div
            className="text-center p-3 bg-accent-50 rounded-xl cursor-pointer hover:bg-accent-100 transition-colors"
            onClick={handleCopyCode}
          >
            <div className="text-2xl font-bold text-accent-700">
              {user?.beverCode}
            </div>
            <div className="text-xs text-accent-600 flex items-center justify-center gap-1">
              {copied ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              Bever Code
            </div>
          </div>
          <div className="text-center p-3 bg-primary-50 rounded-xl">
            <div className="text-2xl font-bold text-primary-950">4.8</div>
            <div className="text-xs text-primary-600">Rating</div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Profile Completion */}
          <ProfileCompletionComponent completion={profileCompletion} />

          {/* Quick Actions */}
          <div className="card">
            <h3 className="font-medium text-primary-950 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors"
                onClick={handleCopyCode}
              >
                <Share2 className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-medium text-primary-950">
                  Share Code
                </span>
              </button>
              <button className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors">
                <HelpCircle className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-medium text-primary-950">
                  Get Help
                </span>
              </button>
              <button className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors">
                <Star className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-medium text-primary-950">
                  Rate App
                </span>
              </button>
              <button className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors">
                <Gift className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-medium text-primary-950">
                  Referrals
                </span>
              </button>
            </div>
          </div>

          {/* Business Information */}
          <div className="card">
            <button
              onClick={() => toggleSection("business")}
              className="w-full flex items-center justify-between mb-4"
            >
              <h3 className="font-medium text-primary-950">
                Business Information
              </h3>
              <motion.div
                animate={{ rotate: expandedSections.has("business") ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-3 h-3 border-r-2 border-b-2 border-primary-400 rotate-45 -translate-y-0.5" />
                </div>
              </motion.div>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: expandedSections.has("business") ? "auto" : 0,
                opacity: expandedSections.has("business") ? 1 : 0,
              }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pb-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="font-medium text-primary-950">
                      {user?.businessAddress}
                    </p>
                    <p className="text-sm text-primary-600">
                      {user?.ward}, Jalingo
                    </p>
                    {user?.subArea && (
                      <p className="text-sm text-primary-600">{user.subArea}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-600" />
                  <span className="text-primary-950">{user?.phoneNumber}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Shop Photo */}
          <div className="card">
            <button
              onClick={() => toggleSection("shop")}
              className="w-full flex items-center justify-between mb-4"
            >
              <h3 className="font-medium text-primary-950">Shop Photo</h3>
              <motion.div
                animate={{ rotate: expandedSections.has("shop") ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-3 h-3 border-r-2 border-b-2 border-primary-400 rotate-45 -translate-y-0.5" />
                </div>
              </motion.div>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: expandedSections.has("shop") ? "auto" : 0,
                opacity: expandedSections.has("shop") ? 1 : 0,
              }}
              className="overflow-hidden"
            >
              {user?.shopPhoto ? (
                <div className="aspect-video bg-primary-50 rounded-xl overflow-hidden relative mb-4">
                  <img
                    src={user.shopPhoto}
                    alt="Shop"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setShowShopPhoto(true)}
                    className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowShopPhoto(true)}
                  className="w-full aspect-video bg-primary-50 rounded-xl flex items-center justify-center hover:bg-primary-100 transition-colors mb-4"
                >
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                    <p className="text-primary-600 text-sm font-medium">
                      Add Shop Photo
                    </p>
                  </div>
                </button>
              )}
            </motion.div>
          </div>

          {/* Transaction PIN */}
          <div className="card">
            <button
              onClick={() => toggleSection("pin")}
              className="w-full flex items-center justify-between mb-4"
            >
              <h3 className="font-medium text-primary-950">Transaction PIN</h3>
              <motion.div
                animate={{ rotate: expandedSections.has("pin") ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-3 h-3 border-r-2 border-b-2 border-primary-400 rotate-45 -translate-y-0.5" />
                </div>
              </motion.div>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: expandedSections.has("pin") ? "auto" : 0,
                opacity: expandedSections.has("pin") ? 1 : 0,
              }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pb-4">
                {hasPin ? (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-accent-50 rounded-xl">
                      <Lock className="w-5 h-5 text-accent-600" />
                      <div>
                        <span className="text-accent-800 font-medium">
                          PIN is secure
                        </span>
                        <p className="text-xs text-accent-600">
                          Last changed: 2 days ago
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => openPinModal("change")}
                      className="btn-secondary w-full"
                    >
                      Change PIN
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                      <Lock className="w-5 h-5 text-orange-600" />
                      <span className="text-orange-800 font-medium">
                        No PIN set - Secure your transactions
                      </span>
                    </div>
                    <button
                      onClick={() => openPinModal("set")}
                      className="btn-primary w-full"
                    >
                      Set Transaction PIN
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Settings */}
          <div className="card">
            <button
              onClick={() => setShowSettings(true)}
              className="w-full flex items-center gap-3 p-4 hover:bg-primary-50 rounded-xl transition-colors"
            >
              <Settings className="w-5 h-5 text-primary-600" />
              <span className="font-medium text-primary-950">
                Settings & Preferences
              </span>
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center justify-center gap-3 p-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        user={user}
        onSave={updateUser}
      />

      <PhotoUploadModal
        isOpen={showCoverPhoto}
        onClose={() => setShowCoverPhoto(false)}
        title="Update Cover Photo"
        currentPhoto={user?.coverPhoto}
        aspectRatio="cover"
        onSave={(file) => {
          const photoUrl = URL.createObjectURL(file);
          updateUser({ coverPhoto: photoUrl });
        }}
      />

      <PhotoUploadModal
        isOpen={showAvatarPhoto}
        onClose={() => setShowAvatarPhoto(false)}
        title="Update Profile Photo"
        currentPhoto={user?.avatar}
        aspectRatio="square"
        onSave={(file) => {
          const photoUrl = URL.createObjectURL(file);
          updateUser({ avatar: photoUrl });
        }}
      />

      <PhotoUploadModal
        isOpen={showShopPhoto}
        onClose={() => setShowShopPhoto(false)}
        title="Update Shop Photo"
        currentPhoto={user?.shopPhoto}
        aspectRatio="cover"
        onSave={(file) => {
          const photoUrl = URL.createObjectURL(file);
          updateUser({ shopPhoto: photoUrl });
        }}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSave={setSettings}
      />

      <LogoutConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={logout}
      />

      {/* PIN Modal */}
      <BaseModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        title={
          pinAction === "set" ? "Set Transaction PIN" : "Change Transaction PIN"
        }
      >
        <div className="space-y-4">
          {pinAction === "change" && (
            <div className="relative">
              <input
                type={pinForm.showPins ? "text" : "password"}
                value={pinForm.currentPin}
                onChange={(e) =>
                  setPinForm((prev) => ({
                    ...prev,
                    currentPin: e.target.value,
                  }))
                }
                placeholder="Current PIN"
                className="input-field pr-12"
                maxLength={6}
              />
              <button
                type="button"
                onClick={() =>
                  setPinForm((prev) => ({ ...prev, showPins: !prev.showPins }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400"
              >
                {pinForm.showPins ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          )}

          <div className="relative">
            <input
              type={pinForm.showPins ? "text" : "password"}
              value={pinForm.newPin}
              onChange={(e) =>
                setPinForm((prev) => ({ ...prev, newPin: e.target.value }))
              }
              placeholder={pinAction === "set" ? "Enter PIN" : "New PIN"}
              className="input-field pr-12"
              maxLength={6}
            />
            <button
              type="button"
              onClick={() =>
                setPinForm((prev) => ({ ...prev, showPins: !prev.showPins }))
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400"
            >
              {pinForm.showPins ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="relative">
            <input
              type={pinForm.showPins ? "text" : "password"}
              value={pinForm.confirmPin}
              onChange={(e) =>
                setPinForm((prev) => ({ ...prev, confirmPin: e.target.value }))
              }
              placeholder="Confirm PIN"
              className="input-field pr-12"
              maxLength={6}
            />
            <button
              type="button"
              onClick={() =>
                setPinForm((prev) => ({ ...prev, showPins: !prev.showPins }))
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400"
            >
              {pinForm.showPins ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {renderPinStrengthIndicator()}

          {pinError && <p className="text-red-500 text-sm">{pinError}</p>}

          <div className="flex gap-3">
            <button
              onClick={() => setShowPinModal(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button onClick={handlePinSubmit} className="btn-primary flex-1">
              {pinAction === "set" ? "Set PIN" : "Change PIN"}
            </button>
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

export default ProfilePage;
