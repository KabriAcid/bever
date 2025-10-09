import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { AdminLayout } from './layouts/AdminLayout';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Products } from './pages/Products';
import { Pricing } from './pages/Pricing';
import { Transactions } from './pages/Transactions';
import { Referrals } from './pages/Referrals';
import { Activity } from './pages/Activity';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { Locations } from './pages/Locations';

export function AdminApp() {
  return (
    <AdminAuthProvider>
      <Router>
        <AdminLayout>
          <Routes>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/pricing" element={<Pricing />} />
            <Route path="/admin/transactions" element={<Transactions />} />
            <Route path="/admin/referrals" element={<Referrals />} />
            <Route path="/admin/activity" element={<Activity />} />
            <Route path="/admin/notifications" element={<Notifications />} />
            <Route path="/admin/locations" element={<Locations />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </AdminLayout>
      </Router>
    </AdminAuthProvider>
  );
}
