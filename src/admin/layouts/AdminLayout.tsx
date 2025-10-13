import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  DollarSign,
  ShoppingCart,
  UserPlus,
  Activity,
  Bell,
  Settings,
  MapPin,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { LogoutConfirmModal } from "../modals/LogoutConfirmModal";

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/users", icon: Users, label: "Users" },
  { path: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { path: "/admin/products", icon: Package, label: "Products" },
  { path: "/admin/pricing", icon: DollarSign, label: "Pricing" },
  { path: "/admin/transactions", icon: ShoppingCart, label: "Transactions" },
  { path: "/admin/referrals", icon: UserPlus, label: "Referrals" },
  { path: "/admin/activity", icon: Activity, label: "Activity" },
  { path: "/admin/notifications", icon: Bell, label: "Notifications" },
  { path: "/admin/locations", icon: MapPin, label: "Locations" },
  { path: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAdminAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleLogout = () => {
    try {
      // store the current route (path + query + hash) so we can return after re-login if needed
      const currentRoute =
        window.location.pathname +
        window.location.search +
        window.location.hash;
      localStorage.setItem("admin:lastRoute", currentRoute);
    } catch (e) {
      // ignore storage errors
    }

    // perform logout and redirect to admin login
    logout();
    navigate("/admin/login", { replace: true });
  };

  // If authentication state flips to false elsewhere, ensure we redirect to login
  if (!isAuthenticated) {
    try {
      navigate("/admin/login", { replace: true });
    } catch (e) {
      // ignore navigation errors during unmount
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:flex">
        {/* Overlay only for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar: always visible on desktop, toggled on mobile with smoother animation */}
        <aside
          className={`fixed top-0 left-0 z-50 h-screen w-80 bg-white border-r border-gray-200 lg:sticky lg:block transition-transform duration-500 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-80"
          } lg:translate-x-0`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <img src="/favicon.png" alt="" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Bever</h1>
                  <p className="text-xs text-gray-500">Admin Dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-black text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => setIsConfirmOpen(true)}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        <LogoutConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => {
            setIsConfirmOpen(false);
            handleLogout();
          }}
        />

        <div className="flex-1 min-w-0">
          <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-700 hover:text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="flex-1 lg:ml-0 ml-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {navItems.find((item) => item.path === location.pathname)
                    ?.label || "Dashboard"}
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      AD
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900">
                      Admin User
                    </p>
                    <p className="text-xs text-gray-500">admin@bever.com</p>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
