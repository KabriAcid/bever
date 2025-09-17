import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { BottomNavigation } from './BottomNavigation';
import { CartSidebar } from './CartSidebar';
import { ProductModal } from './ProductModal';
import { CheckoutForm } from './CheckoutForm';
import { PaymentInstructions } from './PaymentInstructions';
import { ProfilePage } from './ProfilePage';
import { ProductCard } from './ProductCard';
import { products } from '../data/products';
import { Product } from '../types';

type AppView = 'home' | 'checkout' | 'payment' | 'profile' | 'orders';

export const AppLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'profile' | 'cart'>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'water' | 'soft-drinks'>('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTabChange = (tab: 'home' | 'orders' | 'profile' | 'cart') => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentView('home');
    } else if (tab === 'profile') {
      setCurrentView('profile');
    } else if (tab === 'cart') {
      setIsCartOpen(true);
    } else if (tab === 'orders') {
      setCurrentView('orders');
    }
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleProfileClick = () => {
    setCurrentView('profile');
    setActiveTab('profile');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handleProceedToPayment = () => {
    setCurrentView('payment');
  };

  const handlePaymentComplete = () => {
    setCurrentView('home');
    setActiveTab('home');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setActiveTab('home');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'checkout':
        return (
          <CheckoutForm
            onBack={handleBackToHome}
            onProceedToPayment={handleProceedToPayment}
          />
        );
      
      case 'payment':
        return (
          <PaymentInstructions
            onBack={() => setCurrentView('checkout')}
            onPaymentComplete={handlePaymentComplete}
          />
        );
      
      case 'profile':
        return (
          <ProfilePage onBack={handleBackToHome} />
        );
      
      case 'orders':
        return (
          <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
              <div className="p-4">
                <h1 className="text-lg font-semibold text-gray-900 text-center">Orders</h1>
              </div>
            </div>
            <div className="p-4">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-500 text-sm">Your order history will appear here</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar
              onCartClick={handleCartClick}
              onProfileClick={handleProfileClick}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            
            <div className="p-4">
              {/* Categories */}
              <div className="flex space-x-3 mb-6 overflow-x-auto">
                {[
                  { id: 'all', label: 'All Products', emoji: '🛒' },
                  { id: 'water', label: 'Water', emoji: '💧' },
                  { id: 'soft-drinks', label: 'Soft Drinks', emoji: '🥤' }
                ].map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-2xl font-medium text-sm whitespace-nowrap transition-all ${
                      selectedCategory === category.id
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{category.emoji}</span>
                    <span>{category.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Products Grid */}
              <motion.div
                layout
                className="grid grid-cols-2 gap-4"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onProductClick={setSelectedProduct}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500 text-sm">Try adjusting your search or category filter</p>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {renderContent()}
      
      {/* Bottom Navigation - only show on main views */}
      {['home', 'orders'].includes(currentView) && (
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
      
      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
      
      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};