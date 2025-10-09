import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  loading?: boolean;
}

export function StatCard({ label, value, change, icon: Icon, loading }: StatCardProps) {
  if (loading) {
    return (
      <div className="card animate-pulse">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </div>
        {change !== undefined && (
          <div className="h-4 bg-gray-200 rounded w-20 mt-3"></div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900 digit">{value}</p>
        </div>
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
      </div>
      {change !== undefined && (
        <div className="mt-3 flex items-center">
          <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
          <span className="text-sm text-gray-500 ml-2">vs last month</span>
        </div>
      )}
    </motion.div>
  );
}
