import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePin } from "../contexts/PinContext";

interface Props {
  isOpen: boolean;
}

export const TransactionPinModal: React.FC<Props> = ({ isOpen }) => {
  const { setPin } = usePin();
  const [pin, setPinValue] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError(null);
    if (pin !== confirmPin) {
      setError("PINs do not match");
      return;
    }
    if (!/^\d{4,6}$/.test(pin)) {
      setError("PIN must be 4-6 digits");
      return;
    }
    try {
      setLoading(true);
      await setPin(pin);
    } catch (e: any) {
      setError(e?.message || "Failed to set PIN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 shadow-xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Set Transaction PIN
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              For secure payments and sensitive actions, create a 4-6 digit PIN.
            </p>
            <div className="space-y-3">
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter 4-6 digit PIN"
                value={pin}
                onChange={(e) => setPinValue(e.target.value.replace(/\D/g, ""))}
                className="input-field"
              />
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Confirm PIN"
                value={confirmPin}
                onChange={(e) =>
                  setConfirmPin(e.target.value.replace(/\D/g, ""))
                }
                className="input-field"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={submit}
                disabled={loading}
                className="btn-primary w-full disabled:opacity-60"
              >
                {loading ? "Saving…" : "Save PIN"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
