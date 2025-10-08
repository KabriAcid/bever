import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary-50">
      <div className="flex">
        <aside className="w-64 bg-white border-r border-primary-100 p-4 hidden md:block">
          <h2 className="text-lg font-bold text-primary-950 mb-4">Admin</h2>
          <nav className="space-y-2">
            <Link
              to="/admin"
              className="block py-2 px-3 rounded hover:bg-primary-50"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/users"
              className="block py-2 px-3 rounded hover:bg-primary-50"
            >
              Users
            </Link>
            <Link
              to="/admin/products"
              className="block py-2 px-3 rounded hover:bg-primary-50"
            >
              Products
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
