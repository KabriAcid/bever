import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShoppingCart, User, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Layout: React.FC = () => {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: totalItems },
    { path: '/orders', icon: Package, label: 'Orders' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-primary-50">
      <main className="pb-20">
        <Outlet />
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary-200 px-4 py-2 z-40">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map(({ path, icon: Icon, label, badge }) => {
            const count = badge ?? 0;
            return (
            <Link
              key={path}
              to={path}
              className="relative flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200"
            >
              <div className="relative">
                <Icon 
                  className={`w-6 h-6 transition-colors duration-200 ${
                    isActive(path) ? 'text-primary-950' : 'text-primary-400'
                  }`} 
                />
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                  >
                    {count > 99 ? '99+' : count}
                  </motion.span>
                )}
              </div>
              <span 
                className={`text-xs mt-1 transition-colors duration-200 ${
                  isActive(path) ? 'text-primary-950 font-medium' : 'text-primary-400'
                }`}
              >
                {label}
              </span>
              {isActive(path) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-950 rounded-full"
                />
              )}
            </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;