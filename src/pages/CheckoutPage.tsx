import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, CreditCard, Banknote, Copy, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getCartItemsWithDetails, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'cash'>('transfer');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [copied, setCopied] = useState(false);

  const cartItems = getCartItemsWithDetails();
  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice > 5000 ? 0 : 500;
  const finalTotal = totalPrice + deliveryFee;

  // Mock virtual account details
  const virtualAccount = {
    accountNumber: '1234567890',
    bankName: 'Providus Bank',
    accountName: 'Bever Payments'
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(virtualAccount.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and show success
      clearCart();
      setOrderPlaced(true);
      
      // Redirect after showing success
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (error) {
      console.error('Order failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-accent-600" />
          </div>
          <h2 className="text-2xl font-bold text-primary-950 mb-2">Order Placed!</h2>
          <p className="text-primary-600 mb-4">
            Your order has been received and is being processed
          </p>
          <p className="text-sm text-primary-500">
            Redirecting to home...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-primary-100 px-6 py-4 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/cart')}
            className="p-2 hover:bg-primary-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-primary-700" />
          </button>
          <h1 className="text-xl font-bold text-primary-950">Checkout</h1>
        </div>
      </div>

      <div className="px-6 py-6 pb-32">
        {/* Delivery Address */}
        <div className="card mb-6">
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-5 h-5 text-primary-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-medium text-primary-950 mb-1">Delivery Address</h3>
              <p className="text-primary-700">{user?.businessName}</p>
              <p className="text-primary-600 text-sm">{user?.businessAddress}</p>
              <p className="text-primary-600 text-sm">{user?.ward}, Jalingo</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="card mb-6">
          <h3 className="font-medium text-primary-950 mb-4">Order Summary</h3>
          <div className="space-y-3">
            {cartItems.map(({ productId, quantity, product }) => (
              <div key={productId} className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-medium text-primary-950">{product.name}</p>
                  <p className="text-sm text-primary-600">
                    {product.volume} • Qty: {quantity}
                  </p>
                </div>
                <span className="font-medium text-primary-950">
                  ₦{(product.price * quantity).toLocaleString()}
                </span>
              </div>
            ))}
            
            <div className="border-t border-primary-200 pt-3 space-y-2">
              <div className="flex justify-between text-primary-700">
                <span>Subtotal</span>
                <span>₦{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-primary-700">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'Free' : `₦${deliveryFee.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-primary-950 pt-2 border-t border-primary-200">
                <span>Total</span>
                <span>₦{finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="card mb-6">
          <h3 className="font-medium text-primary-950 mb-4">Payment Method</h3>
          
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod('transfer')}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'transfer'
                  ? 'border-primary-950 bg-primary-50'
                  : 'border-primary-200 hover:border-primary-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'transfer' ? 'border-primary-950' : 'border-primary-300'
                }`}>
                  {paymentMethod === 'transfer' && (
                    <div className="w-2.5 h-2.5 bg-primary-950 rounded-full" />
                  )}
                </div>
                <CreditCard className="w-6 h-6 text-primary-600" />
                <div className="text-left">
                  <p className="font-medium text-primary-950">Bank Transfer</p>
                  <p className="text-sm text-primary-600">Pay via bank transfer</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('cash')}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'cash'
                  ? 'border-primary-950 bg-primary-50'
                  : 'border-primary-200 hover:border-primary-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'cash' ? 'border-primary-950' : 'border-primary-300'
                }`}>
                  {paymentMethod === 'cash' && (
                    <div className="w-2.5 h-2.5 bg-primary-950 rounded-full" />
                  )}
                </div>
                <Banknote className="w-6 h-6 text-primary-600" />
                <div className="text-left">
                  <p className="font-medium text-primary-950">Pay on Delivery</p>
                  <p className="text-sm text-primary-600">Pay with cash when delivered</p>
                </div>
              </div>
            </button>
          </div>

          {/* Virtual Account Details */}
          {paymentMethod === 'transfer' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-4 bg-accent-50 border border-accent-200 rounded-xl"
            >
              <h4 className="font-medium text-accent-800 mb-3">Transfer Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-accent-700">Account Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium text-accent-900">
                      {virtualAccount.accountNumber}
                    </span>
                    <button
                      onClick={handleCopyAccount}
                      className="p-1 text-accent-600 hover:text-accent-800 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-accent-700">Bank:</span>
                  <span className="font-medium text-accent-900">{virtualAccount.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-accent-700">Account Name:</span>
                  <span className="font-medium text-accent-900">{virtualAccount.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-accent-700">Amount:</span>
                  <span className="font-bold text-accent-900">₦{finalTotal.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-xs text-accent-600 mt-3">
                Transfer the exact amount to complete your order. Your order will be confirmed automatically.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Place Order Button - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary-200 px-6 py-4">
        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className="btn-primary w-full"
        >
          {isProcessing ? 'Processing Order...' : `Place Order • ₦${finalTotal.toLocaleString()}`}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;