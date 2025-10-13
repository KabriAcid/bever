export interface ClientOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface ClientOrder {
  id: string;
  userId: string;
  items: ClientOrderItem[];
  total: number;
  status: "Placed" | "Processing" | "Delivered" | "Cancelled";
  paymentMethod: "Transfer" | "Pay on Delivery" | string;
  deliveryAddress?: string;
  createdAt: string; // ISO
  deliveredAt?: string | null; // ISO or null
}

const STORAGE_KEY = "bever:client_orders:v1";

export async function getClientOrders(): Promise<ClientOrder[]> {
  await new Promise((r) => setTimeout(r, 80));
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ClientOrder[];
  } catch (e) {
    console.error("Failed to read client orders from storage", e);
    return [];
  }
}

export async function saveClientOrder(
  order: Omit<ClientOrder, "id" | "createdAt">
): Promise<ClientOrder> {
  await new Promise((r) => setTimeout(r, 120));
  try {
    const existing = await getClientOrders();
    const newOrder: ClientOrder = {
      id: `ORD-${Math.floor(Math.random() * 900000 + 1000)}`,
      createdAt: new Date().toISOString(),
      ...order,
    };
    existing.unshift(newOrder);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return newOrder;
  } catch (e) {
    console.error("Failed to save client order", e);
    throw e;
  }
}

export async function clearClientOrders() {
  await new Promise((r) => setTimeout(r, 50));
  localStorage.removeItem(STORAGE_KEY);
}
