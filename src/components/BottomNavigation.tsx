import React from 'react';
import { motion } from 'framer-motion';
import { Home, Package, User, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface BottomNavigationProps {
  activeTab: 'home' | 'orders' | 'profile' | 'cart';
  onTabChange: (tab: 'home' | 'orders' | 'profile' | 'cart') => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const { itemCount } = useCart();

  const tabs = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'orders' as const, icon: Package, label: 'Orders' },
    { id: 'cart' as const, icon: ShoppingCart, label: 'Cart', badge: itemCount },
    { id: 'profile' as const, icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 z-40">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTabChange(tab.id)}
              className={`bottom-nav-item ${isActive ? 'active' : ''} relative`}
            >
              <div className="relative">
                <Icon className="w-5 h-5 mb-1" />
                {tab.badge && tab.badge > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                  >
                    {tab.badge}
                  </motion.span>
                )}
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};