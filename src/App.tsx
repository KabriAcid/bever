import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PinProvider } from "./contexts/PinContext";
import { CartProvider } from "./contexts/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import TransactionPinModal from "./components/TransactionPinModal";
import Layout from "./components/Layout";
import LoginPage from "./client/LoginPage";
import RegisterPage from "./client/RegisterPage";
import HomePage from "./client/HomePage";
import CartPage from "./client/CartPage";
import CheckoutPage from "./client/CheckoutPage";
import OrdersPage from "./client/OrdersPage";
import ProfilePage from "./client/ProfilePage";
import { useAuth } from "./contexts/AuthContext";
import { usePin } from "./contexts/PinContext";

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
