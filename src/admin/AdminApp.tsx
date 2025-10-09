import { Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider, useAdminAuth } from "./contexts/AdminAuthContext";
import { AdminLayout } from "./layouts/AdminLayout";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Products } from "./pages/Products";
import { Pricing } from "./pages/Pricing";
import { Transactions } from "./pages/Transactions";
import { Referrals } from "./pages/Referrals";
import { Activity } from "./pages/Activity";
import { Notifications } from "./pages/Notifications";
import { Settings } from "./pages/Settings";
import { Locations } from "./pages/Locations";
import { Login } from "./pages/Login";

function AdminRoutes() {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="referrals" element={<Referrals />} />
        <Route path="activity" element={<Activity />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="locations" element={<Locations />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
    </AdminLayout>
  );
}

function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<AdminRoutes />} />
      </Routes>
    </AdminAuthProvider>
  );
}

export default AdminApp;
