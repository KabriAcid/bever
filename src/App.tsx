import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { AuthForms } from "./components/AuthForms";
import { AppLayout } from "./components/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { PinProvider, usePin } from "./contexts/PinContext";
import { TransactionPinModal } from "./components/TransactionPinModal";

const AppContentInner: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { isSettingRequired } = usePin();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {user ? (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AppLayout />
          </motion.div>
        ) : (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AuthForms onSuccess={() => {}} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Force PIN setup when logged in but no PIN */}
      <TransactionPinModal isOpen={!!user && isSettingRequired} />
    </>
  );
};

const AppContent: React.FC = () => (
  <PinProvider>
    <AppContentInner />
  </PinProvider>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
