import { useState, useEffect } from 'react';
import { Table, TableRow, TableCell } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { Select } from '../ui/Select';
import { mockTransactions } from '../data/mockData';
import { Transaction, OrderStatus } from '../types';
import { motion } from 'framer-motion';

export function Transactions() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    setTimeout(() => {
      setTransactions(mockTransactions);
      setLoading(false);
    }, 800);
  }, []);

  const filteredTransactions = statusFilter === 'all'
    ? transactions
    : transactions.filter((t) => t.status === statusFilter);

  const handleStatusChange = (transactionId: string, newStatus: OrderStatus) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === transactionId ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
          <p className="text-gray-600 mt-1">Monitor and manage all orders</p>
        </div>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'pending', label: 'Pending' },
            { value: 'confirmed', label: 'Confirmed' },
            { value: 'processing', label: 'Processing' },
            { value: 'delivered', label: 'Delivered' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
          className="w-48"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Table
          headers={['Transaction ID', 'Customer', 'Date', 'Items', 'Amount', 'Delivery', 'Payment', 'Status', 'Actions']}
          loading={loading}
        >
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <span className="font-mono text-sm">{transaction.id}</span>
              </TableCell>
              <TableCell>{transaction.userName}</TableCell>
              <TableCell>
                <div>
                  <p className="text-sm">{transaction.orderDate}</p>
                  {transaction.deliveryDate && (
                    <p className="text-xs text-gray-500">Delivery: {transaction.deliveryDate}</p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="digit">{transaction.items}</span>
              </TableCell>
              <TableCell>
                <span className="font-semibold digit">₦{transaction.amount.toLocaleString()}</span>
              </TableCell>
              <TableCell>
                <Badge variant="info">{transaction.deliveryCategory}</Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    transaction.paymentStatus === 'completed'
                      ? 'success'
                      : transaction.paymentStatus === 'failed'
                      ? 'error'
                      : 'warning'
                  }
                >
                  {transaction.paymentStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <Select
                  value={transaction.status}
                  onChange={(e) => handleStatusChange(transaction.id, e.target.value as OrderStatus)}
                  options={[
                    { value: 'pending', label: 'Pending' },
                    { value: 'confirmed', label: 'Confirmed' },
                    { value: 'processing', label: 'Processing' },
                    { value: 'delivered', label: 'Delivered' },
                    { value: 'cancelled', label: 'Cancelled' },
                  ]}
                  className="w-32"
                />
              </TableCell>
              <TableCell>
                <button className="text-sm text-black hover:underline font-medium">
                  View Details
                </button>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </motion.div>
    </div>
  );
}
