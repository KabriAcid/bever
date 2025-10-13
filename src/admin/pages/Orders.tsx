import { useEffect, useState } from "react";
import { Table, TableRow, TableCell } from "../ui/Table";
import { Select } from "../ui/Select";
import { Input } from "../ui/Input";
import { Eye, RefreshCw } from "lucide-react";
import { getOrders, seedIfEmpty, updateOrderStatus } from "../api/localOrders";
import { motion } from "framer-motion";
import { Order } from "../api/localOrders";

export function Orders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    seedIfEmpty();
    let mounted = true;
    (async () => {
      setLoading(true);
      const data = await getOrders();
      if (!mounted) return;
      setOrders(data.sort((a, b) => (a.orderDate < b.orderDate ? 1 : -1)));
      setLoading(false);
    })();
    // poll every 6s for new orders (simple polling for MVP)
    const id = setInterval(async () => {
      const data = await getOrders();
      if (!mounted) return;
      setOrders((prev) => {
        // quick shallow compare by length and latest id
        if (!data || data.length === prev.length) return prev;
        return data.sort((a, b) => (a.orderDate < b.orderDate ? 1 : -1));
      });
    }, 6000);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const filtered = orders.filter((o) => {
    const matchesQuery =
      !query ||
      (o.id || "").toLowerCase().includes(query.toLowerCase()) ||
      (o.userName || "").toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleStatusChange = async (id: string, newStatus: Order["status"]) => {
    // optimistic update
    const prev = orders;
    setOrders((s) =>
      s.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    try {
      const updated = await updateOrderStatus(id, newStatus);
      if (!updated) throw new Error("Update failed");
    } catch (e) {
      // revert
      setOrders(prev);
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3 mb-6 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
          <p className="text-gray-600 mt-1">
            Latest orders and processing queue
          </p>
        </div>

        <div className="w-full lg:w-auto flex items-center gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search by order id or customer"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full sm:w-96"
            />
          </div>

          <div className="flex items-center gap-3">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "all", label: "All Status" },
                { value: "pending", label: "Pending" },
                { value: "processing", label: "Processing" },
                { value: "approved", label: "Approved" },
                { value: "declined", label: "Declined" },
                { value: "delivered", label: "Delivered" },
              ]}
              className="w-36 text-sm"
              containerClassName="select-compact"
            />

            <button
              title="Refresh orders"
              onClick={async () => {
                setLoading(true);
                const d = await getOrders();
                setOrders(
                  d.sort((a, b) => (a.orderDate < b.orderDate ? 1 : -1))
                );
                setLoading(false);
              }}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
        {/**
         * If we have finished loading and there are no orders at all,
         * render a friendly empty state card (prevents blank page if
         * table rendering fails for any reason).
         */}
        {!loading && orders.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M3 3h18v18H3z" strokeWidth="1.5" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="text-sm text-gray-500 mt-2">
              There are no orders in the system yet.
            </p>
          </div>
        ) : (
          <Table
            headers={[
              "Transaction ID",
              "Customer",
              "Date",
              "Items",
              "Amount",
              "Delivery",
              "Payment",
              "Status",
              "Actions",
            ]}
            loading={loading}
          >
            {filtered.map((o) => (
              <TableRow key={o.id}>
                <TableCell>
                  <span className="font-mono text-sm">{o.id}</span>
                </TableCell>

                <TableCell>{o.userName}</TableCell>

                <TableCell>
                  <div>
                    <p className="text-sm">
                      {new Date(o.orderDate).toLocaleString()}
                    </p>
                    {o.deliveryDate && (
                      <p className="text-xs text-gray-500">
                        Delivery: {o.deliveryDate}
                      </p>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <span className="digit">{o.items}</span>
                </TableCell>

                <TableCell>
                  <span className="font-semibold digit">
                    ₦{o.amount.toLocaleString()}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="text-sm text-gray-700">
                    {o.deliveryCategory || "—"}
                  </span>
                </TableCell>

                <TableCell>
                  {/* Payment badges */}
                  {o.paymentStatus === "completed" ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                      Completed
                    </span>
                  ) : o.paymentStatus === "failed" ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-800">
                      Failed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  )}
                </TableCell>

                <TableCell>
                  <Select
                    value={o.status}
                    onChange={(e) =>
                      handleStatusChange(
                        o.id,
                        e.target.value as Order["status"]
                      )
                    }
                    options={[
                      { value: "pending", label: "Pending" },
                      { value: "processing", label: "Processing" },
                      { value: "approved", label: "Approved" },
                      { value: "declined", label: "Declined" },
                      { value: "delivered", label: "Delivered" },
                    ]}
                    className="w-32 text-sm"
                    containerClassName="select-compact"
                  />
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      title="View details"
                      onClick={() =>
                        (window.location.href = `/admin/orders/${o.id}`)
                      }
                      className="p-2 rounded-md hover:bg-gray-100"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </Table>
        )}
      </motion.div>
    </div>
  );
}
