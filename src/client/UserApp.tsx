import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PinProvider } from "./contexts/PinContext";
import { CartProvider } from "./contexts/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import TransactionPinModal from "./components/TransactionPinModal";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuth } from "./contexts/AuthContext";
import { usePin } from "./contexts/PinContext";

const UserAppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isSettingRequired } = usePin();

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? <RegisterPage /> : <Navigate to="/home" />
          }
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<HomePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* Transaction PIN Modal */}
      <TransactionPinModal isOpen={isSettingRequired} />
    </>
  );
};

const UserApp: React.FC = () => {
  return (
    <AuthProvider>
      <PinProvider>
        <CartProvider>
          <UserAppContent />
        </CartProvider>
      </PinProvider>
    </AuthProvider>
  );
};

export default UserApp;
