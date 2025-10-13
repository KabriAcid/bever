import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import { usePin } from "../contexts/PinContext";

interface TransactionPinModalProps {
  isOpen: boolean;
}

const TransactionPinModal: React.FC<TransactionPinModalProps> = ({
  isOpen,
}) => {
  const { setPin } = usePin();
  const [pin, setPinValue] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"create" | "confirm">("create");

  const handlePinChange = (value: string) => {
    if (value.length <= 6 && /^\d*$/.test(value)) {
      if (step === "create") {
        setPinValue(value);
        setError("");
      } else {
        setConfirmPin(value);
        setError("");
      }
    }
  };

  const handleContinue = () => {
    if (step === "create") {
      if (pin.length < 4) {
        setError("PIN must be at least 4 digits");
        return;
      }
      setStep("confirm");
    } else {
      if (pin !== confirmPin) {
        setError("PINs do not match");
        return;
      }
      setPin(pin);
    }
  };

  const handleBack = () => {
    setStep("create");
    setConfirmPin("");
    setError("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-primary-950 mb-2">
                {step === "create" ? "Create Transaction PIN" : "Confirm PIN"}
              </h2>
              <p className="text-primary-600">
                {step === "create"
                  ? "Set up a 4-6 digit PIN to secure your transactions"
                  : "Please confirm your PIN"}
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  value={step === "create" ? pin : confirmPin}
                  onChange={(e) => handlePinChange(e.target.value)}
                  placeholder={step === "create" ? "Enter PIN" : "Confirm PIN"}
                  className="input-field text-center text-2xl tracking-widest pr-12"
                  maxLength={6}
                  autoFocus
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

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <div className="flex gap-3">
                {step === "confirm" && (
                  <button onClick={handleBack} className="btn-secondary flex-1">
                    Back
                  </button>
                )}
                <button
                  onClick={handleContinue}
                  disabled={
                    step === "create" ? pin.length < 4 : confirmPin.length < 4
                  }
                  className="btn-primary flex-1"
                >
                  {step === "create" ? "Continue" : "Set PIN"}
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-primary-500">
                Your PIN is stored securely and is required for all transactions
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransactionPinModal;
