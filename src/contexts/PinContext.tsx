import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PinContextType } from "../types";
import { useAuth } from "./AuthContext";

const PinContext = createContext<PinContextType | undefined>(undefined);

export const usePin = () => {
  const ctx = useContext(PinContext);
  if (!ctx) throw new Error("usePin must be used within a PinProvider");
  return ctx;
};

const STORAGE_KEY = (userId: string) => `bever:txpin:${userId}`;

export const PinProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [hasPin, setHasPin] = useState(false);

  // Load state when user changes
  useEffect(() => {
    if (!user) {
      setHasPin(false);
      return;
    }
    const stored = localStorage.getItem(STORAGE_KEY(user.id));
    setHasPin(!!stored);
  }, [user]);

  const setPin = async (pin: string) => {
    if (!user) throw new Error("Not authenticated");
    if (!/^\d{4,6}$/.test(pin)) throw new Error("PIN must be 4-6 digits");
    // In real app, encrypt or hash; here we store as is for demo
    localStorage.setItem(STORAGE_KEY(user.id), pin);
    setHasPin(true);
  };

  const verifyPin = async (pin: string) => {
    if (!user) return false;
    const stored = localStorage.getItem(STORAGE_KEY(user.id));
    return stored === pin;
  };

  const changePin = async (oldPin: string, newPin: string) => {
    const ok = await verifyPin(oldPin);
    if (!ok) return false;
    await setPin(newPin);
    return true;
  };

  const clearPin = () => {
    if (!user) return;
    localStorage.removeItem(STORAGE_KEY(user.id));
    setHasPin(false);
  };

  const value = useMemo<PinContextType>(
    () => ({
      hasPin,
      isSettingRequired: !!user && !hasPin,
      setPin,
      verifyPin,
      changePin,
      clearPin,
    }),
    [hasPin, user]
  );

  return <PinContext.Provider value={value}>{children}</PinContext.Provider>;
};
