// localOrders.ts — simple localStorage-backed order store for MVP
export type OrderStatus =
  | "pending"
  | "approved"
  | "declined"
  | "processing"
  | "delivered";

export interface Order {
  id: string;
  userName: string;
  items: number;
  amount: number;
  orderDate: string; // ISO
  deliveryDate?: string;
  status: OrderStatus;
  paymentStatus: "pending" | "completed" | "failed";
  deliveryCategory?: string;
}

const STORAGE_KEY = "bever:orders:v1";

function readStore(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Order[];
  } catch (e) {
    console.error("Failed to read orders from storage", e);
    return [];
  }
}

function writeStore(orders: Order[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error("Failed to write orders to storage", e);
  }
}

// Seed sample orders if none exist
export function seedIfEmpty() {
  const current = readStore();
  if (current.length === 0) {
    const seed: Order[] = [
      {
        id: "TXN-1001",
        userName: "Golden Springs Hotel",
        items: 12,
        amount: 125000,
        orderDate: new Date().toISOString(),
        deliveryDate: undefined,
        status: "pending",
        paymentStatus: "completed",
        deliveryCategory: "express",
      },
      {
        id: "TXN-1002",
        userName: "Campus Convenience Store",
        items: 6,
        amount: 89000,
        orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        deliveryDate: undefined,
        status: "processing",
        paymentStatus: "completed",
        deliveryCategory: "scheduled",
      },
    ];
    writeStore(seed);
  }
}

export async function getOrders(): Promise<Order[]> {
  // mimic async
  await new Promise((r) => setTimeout(r, 200));
  return readStore();
}

export async function getOrder(id: string): Promise<Order | undefined> {
  await new Promise((r) => setTimeout(r, 120));
  return readStore().find((o) => o.id === id);
}

export async function updateOrderStatus(
  id: string,
  status: Order["status"]
): Promise<Order | undefined> {
  // mimic network latency
  await new Promise((r) => setTimeout(r, 300));
  const orders = readStore();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return undefined;
  orders[idx] = { ...orders[idx], status };
  writeStore(orders);
  return orders[idx];
}

export async function createOrder(
  payload: Omit<Order, "id" | "orderDate">
): Promise<Order> {
  await new Promise((r) => setTimeout(r, 200));
  const orders = readStore();
  const newOrder: Order = {
    id: `TXN-${Math.floor(Math.random() * 900000 + 1000)}`,
    orderDate: new Date().toISOString(),
    ...payload,
  };
  orders.unshift(newOrder);
  writeStore(orders);
  return newOrder;
}

export async function clearOrders() {
  await new Promise((r) => setTimeout(r, 100));
  writeStore([]);
}
