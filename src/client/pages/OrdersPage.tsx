import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Star, RotateCcw, Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Order } from '../types';

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock orders data - in real app, this would come from API
  const mockOrders: Order[] = [
    {
      id: 'hjxk-c38dm',
      userId: user?.id || '1',
      items: [
        { productId: 'eva-water-75cl-pack', quantity: 2, price: 2400 },
        { productId: 'coca-cola-33cl-pack', quantity: 1, price: 7200 }
      ],
      total: 12000,
      status: 'Delivered',
      paymentMethod: 'Transfer',
      deliveryAddress: user?.businessAddress || 'Demo Address',
      createdAt: new Date('2024-01-15T21:00:00'),
      deliveredAt: new Date('2024-01-16T14:30:00')
    },
    {
      id: 'sdjs-83jm',
      userId: user?.id || '1',
      items: [
        { productId: 'pepsi-33cl-pack', quantity: 3, price: 7000 },
        { productId: 'chivita-1l-pack', quantity: 1, price: 4800 }
      ],
      total: 25800,
      status: 'Processing',
      paymentMethod: 'Pay on Delivery',
      deliveryAddress: user?.businessAddress || 'Demo Address',
      createdAt: new Date('2024-01-14T18:45:00')
    },
    {
      id: 'hjleai8-23u8',
      userId: user?.id || '1',
      items: [
        { productId: 'fanta-35cl-pack', quantity: 2, price: 3000 },
        { productId: 'eva-water-1.5l-pack', quantity: 1, price: 3600 }
      ],
      total: 10100,
      status: 'Cancelled',
      paymentMethod: 'Transfer',
      deliveryAddress: user?.businessAddress || 'Demo Address',
      createdAt: new Date('2024-01-13T16:20:00')
    },
    {
      id: 'kl9p-x7nm',
      userId: user?.id || '1',
      items: [
        { productId: 'monster-50cl-pack', quantity: 1, price: 14400 },
        { productId: 'sprite-35cl-pack', quantity: 2, price: 3000 }
      ],
      total: 20900,
      status: 'Confirmed',
      paymentMethod: 'Transfer',
      deliveryAddress: user?.businessAddress || 'Demo Address',
      createdAt: new Date('2024-01-12T12:15:00')
    }
  ];

  const filteredOrders = mockOrders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-accent-100 text-accent-700';
      case 'Processing':
        return 'bg-blue-100 text-blue-700';
      case 'Confirmed':
        return 'bg-orange-100 text-orange-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-primary-100 text-primary-700';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-3 h-3" />;
      case 'Processing':
        return <Clock className="w-3 h-3" />;
      case 'Confirmed':
        return <Package className="w-3 h-3" />;
      case 'Cancelled':
        return <XCircle className="w-3 h-3" />;
      default:
        return <Package className="w-3 h-3" />;
    }
  };

  const handleReorder = (order: Order) => {
    // Add all items from the order to cart
    order.items.forEach(item => {
      addItem(item.productId, item.quantity);
    });
    
    // Show success feedback
    alert('Items added to cart successfully!');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }) + ', ' + date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProductName = (productId: string) => {
    // In real app, you'd fetch from products data
    const productNames: { [key: string]: string } = {
      'eva-water-75cl-pack': 'Eva Water 75cl Pack',
      'coca-cola-33cl-pack': 'Coca-Cola 33cl Pack',
      'pepsi-33cl-pack': 'Pepsi 33cl Pack',
      'chivita-1l-pack': 'Chivita Active Orange 1L',
      'fanta-35cl-pack': 'Fanta Orange 35cl Pack',
      'eva-water-1.5l-pack': 'Eva Water 1.5L Pack',
      'monster-50cl-pack': 'Monster Energy 50cl Pack',
      'sprite-35cl-pack': 'Sprite 35cl Pack'
    };
    return productNames[productId] || 'Unknown Product';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-primary-100 px-6 py-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-primary-950">Orders</h1>
            <p className="text-primary-600">Track your beverage orders</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order ID"
            className="input-field pl-12"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="px-6 py-6 pb-32">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-primary-400" />
            </div>
            <h3 className="text-lg font-medium text-primary-950 mb-2">No orders found</h3>
            <p className="text-primary-600">
              {searchQuery ? 'Try adjusting your search' : 'You haven\'t placed any orders yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-primary-950">
                        {order.id}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-primary-600">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg text-accent-600">
                      ₦{order.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-primary-600">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''} • {order.paymentMethod}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReorder(order);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reorder
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-primary-100 px-6 py-4 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-primary-950">Order Details</h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="w-10 h-10 bg-accent-500 hover:bg-accent-600 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="px-6 py-6">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono font-bold text-lg text-primary-950">
                        {selectedOrder.id}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        {selectedOrder.status}
                      </span>
                    </div>
                    <p className="text-primary-600">
                      {formatDate(selectedOrder.createdAt)}
                    </p>
                    {selectedOrder.deliveredAt && (
                      <p className="text-sm text-accent-600">
                        Delivered: {formatDate(selectedOrder.deliveredAt)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-medium text-primary-950">Items Ordered</h3>
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div className="flex-1">
                        <p className="font-medium text-primary-950">
                          {item.quantity}x {getProductName(item.productId)}
                        </p>
                      </div>
                      <span className="font-medium text-primary-950">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="border-t border-primary-200 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-primary-700">Payment Method:</span>
                    <span className="font-medium text-primary-950">{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-primary-700">Delivery Address:</span>
                    <span className="font-medium text-primary-950 text-right max-w-[200px]">
                      {selectedOrder.deliveryAddress}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold text-accent-600 pt-2 border-t border-primary-200">
                    <span>Total</span>
                    <span>₦{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReorder(selectedOrder)}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Reorder
                  </button>
                  <button className="btn-secondary flex-1 flex items-center justify-center gap-2">
                    <Star className="w-5 h-5" />
                    Rate Order
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrdersPage;