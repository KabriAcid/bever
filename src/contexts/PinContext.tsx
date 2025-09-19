import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface PinContextType {
  hasPin: boolean;
  isSettingRequired: boolean;
  setPin: (pin: string) => void;
  verifyPin: (pin: string) => boolean;
  changePin: (oldPin: string, newPin: string) => boolean;
  clearPin: () => void;
}

const PinContext = createContext<PinContextType | undefined>(undefined);

export const usePin = () => {
  const context = useContext(PinContext);
  if (context === undefined) {
    throw new Error('usePin must be used within a PinProvider');
  }
  return context;
};

interface PinProviderProps {
  children: ReactNode;
}

export const PinProvider: React.FC<PinProviderProps> = ({ children }) => {
  const { user, updateUser } = useAuth();
  const [hasPin, setHasPin] = useState(false);

  useEffect(() => {
    if (user) {
      const savedPin = localStorage.getItem(`bever_pin_${user.id}`);
      const pinExists = !!savedPin;
      setHasPin(pinExists);
      
      // Update user's hasPin status if it differs
      if (user.hasPin !== pinExists) {
        updateUser({ hasPin: pinExists });
      }
    } else {
      setHasPin(false);
    }
  }, [user, updateUser]);

  const setPin = (pin: string) => {
    if (user && pin.length >= 4 && pin.length <= 6) {
      localStorage.setItem(`bever_pin_${user.id}`, pin);
      setHasPin(true);
      updateUser({ hasPin: true });
    }
  };

  const verifyPin = (pin: string): boolean => {
    if (!user) return false;
    const savedPin = localStorage.getItem(`bever_pin_${user.id}`);
    return savedPin === pin;
  };

  const changePin = (oldPin: string, newPin: string): boolean => {
    if (!user) return false;
    if (!verifyPin(oldPin)) return false;
    if (newPin.length < 4 || newPin.length > 6) return false;
    
    localStorage.setItem(`bever_pin_${user.id}`, newPin);
    return true;
  };

  const clearPin = () => {
    if (user) {
      localStorage.removeItem(`bever_pin_${user.id}`);
      setHasPin(false);
      updateUser({ hasPin: false });
    }
  };

  const isSettingRequired = user && !hasPin;

  const value = {
    hasPin,
    isSettingRequired: !!isSettingRequired,
    setPin,
    verifyPin,
    changePin,
    clearPin,
  };

  return <PinContext.Provider value={value}>{children}</PinContext.Provider>;
};