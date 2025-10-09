import { useState, useEffect } from "react";
import { StatCard } from "../ui/StatCard";
import { Badge } from "../ui/Badge";
import {
  ShoppingCart,
  Users,
  DollarSign,
  Star,
  TrendingUp,
  Package,
} from "lucide-react";
import { mockTransactions, mockUsers } from "../data/mockData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { motion } from "framer-motion";

const revenueData = [
  { month: "Jan", revenue: 1200000 },
  { month: "Feb", revenue: 1500000 },
  { month: "Mar", revenue: 1800000 },
  { month: "Apr", revenue: 1600000 },
  { month: "May", revenue: 2100000 },
  { month: "Jun", revenue: 2400000 },
];

const ordersData = [
  { day: "Mon", orders: 45 },
  { day: "Tue", orders: 52 },
  { day: "Wed", orders: 38 },
  { day: "Thu", orders: 67 },
  { day: "Fri", orders: 89 },
  { day: "Sat", orders: 102 },
  { day: "Sun", orders: 78 },
];

export function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const totalRevenue = mockTransactions.reduce((sum, t) => sum + t.amount, 0);
  const activeUsers = mockUsers.filter((u) => u.userStatus === "active").length;
  const totalOrders = mockTransactions.length;
  const avgRating = 4.7;

  const kpis = [
    {
      label: "Total Revenue",
      value: `₦${(totalRevenue / 1000).toFixed(1)}K`,
      icon: DollarSign,
    },
    { label: "Active Users", value: activeUsers, icon: Users },
    { label: "Total Orders", value: totalOrders, icon: ShoppingCart },
    { label: "Avg Rating", value: avgRating.toFixed(1), icon: Star },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <StatCard key={idx} {...kpi} loading={loading} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Revenue Trend
            </h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          {loading ? (
            <div className="h-64 animate-pulse bg-gray-200 rounded-lg"></div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value: number) => [
                    `₦${(value / 1000).toFixed(0)}K`,
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#000000"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Weekly Orders
            </h3>
            <Package className="w-5 h-5 text-gray-600" />
          </div>
          {loading ? (
            <div className="h-64 animate-pulse bg-gray-200 rounded-lg"></div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="day"
                  stroke="#9ca3af"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value: number) => [value, "Orders"]}
                />
                <Bar dataKey="orders" fill="#000000" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Transactions
        </h3>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-pulse"
              >
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-24"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {mockTransactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {transaction.userName}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {transaction.id} • {transaction.items} items •{" "}
                    {transaction.orderDate}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      transaction.status === "delivered"
                        ? "success"
                        : transaction.status === "processing"
                        ? "info"
                        : "warning"
                    }
                  >
                    {transaction.status}
                  </Badge>
                  <span className="font-semibold text-gray-900 digit">
                    ₦{transaction.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
