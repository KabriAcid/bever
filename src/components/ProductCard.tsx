import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const { addItem, items, updateQuantity } = useCart();
  
  const cartItem = items.find(item => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleUpdateQuantity = (e: React.MouseEvent, newQuantity: number) => {
    e.stopPropagation();
    updateQuantity(product.id, newQuantity);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onProductClick(product)}
      className="card p-4 cursor-pointer group"
    >
      <div className="relative mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
            <span className="text-white font-medium text-sm">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-primary-600 font-bold text-lg">
            ₦{product.price.toLocaleString()}
          </span>
          
          {quantity > 0 ? (
            <div className="flex items-center space-x-2 bg-primary-50 rounded-xl p-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleUpdateQuantity(e, quantity - 1)}
                className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm"
              >
                <Minus className="w-3 h-3 text-primary-600" />
              </motion.button>
              
              <span className="text-primary-600 font-semibold text-sm min-w-[20px] text-center">
                {quantity}
              </span>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleUpdateQuantity(e, quantity + 1)}
                className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center shadow-sm"
              >
                <Plus className="w-3 h-3 text-white" />
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-8 h-8 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 rounded-xl flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4 text-white" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};