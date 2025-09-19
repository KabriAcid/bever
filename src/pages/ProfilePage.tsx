import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  EyeOff
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePin } from '../contexts/PinContext';

const ProfilePage: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const { hasPin, setPin, verifyPin, changePin, clearPin } = usePin();
  const [copied, setCopied] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinAction, setPinAction] = useState<'set' | 'change' | 'clear'>('set');
  const [pinForm, setPinForm] = useState({
    currentPin: '',
    newPin: '',
    confirmPin: '',
    showPins: false
  });
  const [pinError, setPinError] = useState('');

  const handleCopyCode = () => {
    if (user?.beverCode) {
      navigator.clipboard.writeText(user.beverCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const getVerificationBadge = () => {
    switch (user?.verificationStatus) {
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">
            <Check className="w-3 h-3" />
            Verified
          </span>
        );
      case 'Agent Visit':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            <Shield className="w-3 h-3" />
            Agent Visit
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
            <Shield className="w-3 h-3" />
            Pending
          </span>
        );
    }
  };

  const openPinModal = (action: 'set' | 'change' | 'clear') => {
    setPinAction(action);
    setShowPinModal(true);
    setPinForm({
      currentPin: '',
      newPin: '',
      confirmPin: '',
      showPins: false
    });
    setPinError('');
  };

  const handlePinSubmit = () => {
    setPinError('');

    if (pinAction === 'set') {
      if (pinForm.newPin.length < 4) {
        setPinError('PIN must be at least 4 digits');
        return;
      }
      if (pinForm.newPin !== pinForm.confirmPin) {
        setPinError('PINs do not match');
        return;
      }
      setPin(pinForm.newPin);
      setShowPinModal(false);
    } else if (pinAction === 'change') {
      if (!verifyPin(pinForm.currentPin)) {
        setPinError('Current PIN is incorrect');
        return;
      }
      if (pinForm.newPin.length < 4) {
        setPinError('New PIN must be at least 4 digits');
        return;
      }
      if (pinForm.newPin !== pinForm.confirmPin) {
        setPinError('New PINs do not match');
        return;
      }
      if (changePin(pinForm.currentPin, pinForm.newPin)) {
        setShowPinModal(false);
      } else {
        setPinError('Failed to change PIN');
      }
    } else if (pinAction === 'clear') {
      if (!verifyPin(pinForm.currentPin)) {
        setPinError('Current PIN is incorrect');
        return;
      }
      clearPin();
      setShowPinModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-primary-950 text-white px-6 py-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold mb-1">{user?.businessName}</h1>
          <p className="text-white/80">{user?.customerCategory}</p>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Bever Code */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-primary-950">Bever Code</h3>
            {getVerificationBadge()}
          </div>
          <div className="flex items-center justify-between p-3 bg-primary-50 rounded-xl">
            <span className="font-mono font-bold text-primary-950 text-lg">
              {user?.beverCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="p-2 text-primary-600 hover:text-primary-950 transition-colors"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-primary-600 mt-2">
            Share this code with friends to earn referral rewards
          </p>
        </div>

        {/* Business Information */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-primary-950">Business Information</h3>
            <button className="p-2 text-primary-600 hover:text-primary-950 transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-600 mt-1" />
              <div>
                <p className="font-medium text-primary-950">{user?.businessAddress}</p>
                <p className="text-sm text-primary-600">{user?.ward}, Jalingo</p>
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
        </div>

        {/* Shop Photo */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-primary-950">Shop Photo</h3>
            <button className="p-2 text-primary-600 hover:text-primary-950 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          {user?.shopPhoto ? (
            <div className="aspect-video bg-primary-50 rounded-xl overflow-hidden">
              <img
                src={user.shopPhoto}
                alt="Shop"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video bg-primary-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                <p className="text-primary-600 text-sm">No photo uploaded</p>
              </div>
            </div>
          )}
        </div>

        {/* Transaction PIN */}
        <div className="card">
          <h3 className="font-medium text-primary-950 mb-4">Transaction PIN</h3>
          
          <div className="space-y-3">
            {hasPin ? (
              <>
                <div className="flex items-center gap-3 p-3 bg-accent-50 rounded-xl">
                  <Lock className="w-5 h-5 text-accent-600" />
                  <span className="text-accent-800 font-medium">PIN is set</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => openPinModal('change')}
                    className="btn-secondary flex-1"
                  >
                    Change PIN
                  </button>
                  <button
                    onClick={() => openPinModal('clear')}
                    className="btn-secondary flex-1 text-red-600 hover:bg-red-50"
                  >
                    Clear PIN
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                  <Lock className="w-5 h-5 text-orange-600" />
                  <span className="text-orange-800 font-medium">No PIN set</span>
                </div>
                <button
                  onClick={() => openPinModal('set')}
                  className="btn-primary w-full"
                >
                  Set Transaction PIN
                </button>
              </>
            )}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* PIN Modal */}
      {showPinModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-bold text-primary-950 mb-4">
              {pinAction === 'set' && 'Set Transaction PIN'}
              {pinAction === 'change' && 'Change Transaction PIN'}
              {pinAction === 'clear' && 'Clear Transaction PIN'}
            </h3>

            <div className="space-y-4">
              {(pinAction === 'change' || pinAction === 'clear') && (
                <div className="relative">
                  <input
                    type={pinForm.showPins ? 'text' : 'password'}
                    value={pinForm.currentPin}
                    onChange={(e) => setPinForm(prev => ({ ...prev, currentPin: e.target.value }))}
                    placeholder="Current PIN"
                    className="input-field pr-12"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setPinForm(prev => ({ ...prev, showPins: !prev.showPins }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400"
                  >
                    {pinForm.showPins ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              )}

              {pinAction !== 'clear' && (
                <>
                  <div className="relative">
                    <input
                      type={pinForm.showPins ? 'text' : 'password'}
                      value={pinForm.newPin}
                      onChange={(e) => setPinForm(prev => ({ ...prev, newPin: e.target.value }))}
                      placeholder={pinAction === 'set' ? 'Enter PIN' : 'New PIN'}
                      className="input-field pr-12"
                      maxLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setPinForm(prev => ({ ...prev, showPins: !prev.showPins }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400"
                    >
                      {pinForm.showPins ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={pinForm.showPins ? 'text' : 'password'}
                      value={pinForm.confirmPin}
                      onChange={(e) => setPinForm(prev => ({ ...prev, confirmPin: e.target.value }))}
                      placeholder="Confirm PIN"
                      className="input-field pr-12"
                      maxLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setPinForm(prev => ({ ...prev, showPins: !prev.showPins }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400"
                    >
                      {pinForm.showPins ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </>
              )}

              {pinError && (
                <p className="text-red-500 text-sm">{pinError}</p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPinModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePinSubmit}
                  className="btn-primary flex-1"
                >
                  {pinAction === 'set' && 'Set PIN'}
                  {pinAction === 'change' && 'Change PIN'}
                  {pinAction === 'clear' && 'Clear PIN'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfilePage;