import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./client/contexts/AuthContext";
import { PinProvider } from "./client/contexts/PinContext";
import { CartProvider } from "./client/contexts/CartContext";
import ProtectedRoute from "./client/components/ProtectedRoute";
import TransactionPinModal from "./client/components/TransactionPinModal";
import Layout from "./client/components/Layout";
import LoginPage from "./client/pages/LoginPage";
import RegisterPage from "./client/pages/RegisterPage";
import HomePage from "./client/pages/HomePage";
import CartPage from "./client/pages/CartPage";
import CheckoutPage from "./client/pages/CheckoutPage";
import OrdersPage from "./client/pages/OrdersPage";
import ProfilePage from "./client/pages/ProfilePage";
import { useAuth } from "./client/contexts/AuthContext";
import { usePin } from "./client/contexts/PinContext";

const AppContent: React.FC = () => {
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
      </Routes>

      {/* Transaction PIN Modal */}
      <TransactionPinModal isOpen={isSettingRequired} />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <PinProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </PinProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
