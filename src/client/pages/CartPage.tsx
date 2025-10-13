import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    getCartItemsWithDetails,
    updateQuantity,
    removeItem,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const cartItems = getCartItemsWithDetails();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const deliveryFee = totalPrice > 5000 ? 0 : 500;
  const finalTotal = totalPrice + deliveryFee;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-primary-100 px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/home")}
              className="p-2 hover:bg-primary-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-primary-700" />
            </button>
            <h1 className="text-xl font-bold text-primary-950">Your Cart</h1>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center px-6 py-20">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-primary-400" />
          </div>
          <h2 className="text-2xl font-bold text-primary-950 mb-2">
            Your cart is empty
          </h2>
          <p className="text-primary-600 text-center mb-8">
            Add some beverages to get started
          </p>
          <button onClick={() => navigate("/home")} className="btn-primary">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-primary-100 px-6 py-4 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/home")}
            className="p-2 hover:bg-primary-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-primary-700" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-primary-950">Your Cart</h1>
            <p className="text-sm text-primary-600">{totalItems} items</p>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-6 py-6 pb-60">
        <div className="space-y-4">
          {cartItems.map(({ productId, quantity, product }) => (
            <motion.div
              key={productId}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card p-4"
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-primary-50 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-primary-950 leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-sm text-primary-600">
                        {product.volume} • {product.packaging}
                        {product.packSize && ` • Pack of ${product.packSize}`}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(productId)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary-950">
                      ₦{(product.price * quantity).toLocaleString()}
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          handleQuantityChange(productId, quantity - 1)
                        }
                        className="w-8 h-8 bg-accent hover:bg-accent text-white rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium text-primary-950 min-w-[20px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(productId, quantity + 1)
                        }
                        className="w-8 h-8 bg-accent hover:bg-accent text-white rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Order Summary - Fixed Bottom */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-primary-200 px-6 py-4 z-30">
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-primary-700">
            <span>Subtotal</span>
            <span>₦{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-primary-700">
            <span>Delivery Fee</span>
            <span>
              {deliveryFee === 0 ? "Free" : `₦${deliveryFee.toLocaleString()}`}
            </span>
          </div>
          {deliveryFee === 0 && (
            <p className="text-xs text-accent">
              Free delivery on orders above ₦5,000
            </p>
          )}
          <div className="flex justify-between text-lg font-bold text-primary-950 pt-2 border-t border-primary-200">
            <span>Total</span>
            <span>₦{finalTotal.toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="btn-primary w-full"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
