import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrder } from "../api/localOrders";
import { Badge } from "../ui/Badge";
import { ArrowLeft } from "lucide-react";

export function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      if (!id) return;
      const o = await getOrder(id);
      if (!mounted) return;
      setOrder(o || null);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!order) return <div className="p-6">Order not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold">Order {order.id}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <h4 className="font-medium text-gray-900 mb-2">Customer</h4>
          <p className="text-sm text-gray-700">{order.userName}</p>
          <p className="text-xs text-gray-500 mt-2">
            Order date: {new Date(order.orderDate).toLocaleString()}
          </p>
          {order.deliveryDate && (
            <p className="text-xs text-gray-500">
              Delivery: {order.deliveryDate}
            </p>
          )}
        </div>

        <div className="card">
          <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
          <p className="text-sm text-gray-700">
            Items: <span className="font-medium">{order.items}</span>
          </p>
          <p className="text-sm text-gray-700">
            Amount:{" "}
            <span className="font-medium">
              ₦{order.amount.toLocaleString()}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            Delivery:{" "}
            <span className="font-medium">{order.deliveryCategory || "—"}</span>
          </p>
        </div>

        <div className="card">
          <h4 className="font-medium text-gray-900 mb-2">Status</h4>
          <div className="space-y-2">
            <Badge
              variant={
                order.paymentStatus === "completed"
                  ? "success"
                  : order.paymentStatus === "failed"
                  ? "error"
                  : "warning"
              }
            >
              {order.paymentStatus}
            </Badge>
            <Badge
              variant={
                order.status === "delivered"
                  ? "success"
                  : order.status === "processing"
                  ? "info"
                  : "pending"
              }
            >
              {order.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="card">
        <h4 className="font-medium text-gray-900 mb-3">Raw JSON</h4>
        <pre className="text-xs text-gray-700 max-h-72 overflow-auto p-3 bg-gray-50 rounded">
          {JSON.stringify(order, null, 2)}
        </pre>
      </div>
    </div>
  );
}
