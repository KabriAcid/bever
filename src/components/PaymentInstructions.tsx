import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, CheckCircle, Clock, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface PaymentInstructionsProps {
  onBack: () => void;
  onPaymentComplete: () => void;
}

export const PaymentInstructions: React.FC<PaymentInstructionsProps> = ({ 
  onBack, 
  onPaymentComplete 
}) => {
  const { total, clearCart } = useCart();
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'confirmed'>('pending');
  
  const deliveryFee = 500;
  const finalTotal = total + deliveryFee;
  const virtualAccountNumber = '2034567890';
  const bankName = 'First Bank Nigeria';

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText(virtualAccountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const simulatePaymentConfirmation = () => {
    setTimeout(() => {
      setPaymentStatus('confirmed');
      setTimeout(() => {
        clearCart();
        onPaymentComplete();
      }, 2000);
    }, 3000);
  };

  React.useEffect(() => {
    simulatePaymentConfirmation();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <h1 className="text-lg font-semibold text-gray-900">Payment</h1>
          <div className="w-9" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Payment Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 text-center"
        >
          {paymentStatus === 'pending' ? (
            <>
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Payment Pending
              </h2>
              <p className="text-gray-600 text-sm">
                Please complete your payment using the details below
              </p>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Payment Confirmed!
              </h2>
              <p className="text-gray-600 text-sm">
                Your order has been received and will be delivered soon
              </p>
            </>
          )}
        </motion.div>

        {/* Payment Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-4"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Bank Transfer</h3>
              <p className="text-gray-600 text-sm">Transfer to virtual account</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Account Number</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyAccount}
                  className="flex items-center space-x-1 text-primary-600 text-sm font-medium"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
              </div>
              <p className="text-2xl font-bold text-gray-900 font-mono">
                {virtualAccountNumber}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-700 block mb-1">Bank Name</span>
                <p className="text-gray-900 font-medium">{bankName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 block mb-1">Amount</span>
                <p className="text-primary-600 font-bold text-lg">
                  ₦{finalTotal.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-4"
        >
          <h3 className="font-semibold text-gray-900 mb-3">Payment Instructions</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-600 font-semibold text-xs">1</span>
              </div>
              <p>Copy the account number above and transfer the exact amount</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-600 font-semibold text-xs">2</span>
              </div>
              <p>Payment will be automatically confirmed within 2-5 minutes</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-600 font-semibold text-xs">3</span>
              </div>
              <p>Your order will be prepared and delivered to your address</p>
            </div>
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-4"
        >
          <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">₦{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="text-gray-900">₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold text-base border-t border-gray-100 pt-2">
              <span className="text-gray-900">Total</span>
              <span className="text-primary-600">₦{finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};