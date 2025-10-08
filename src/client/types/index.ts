export interface User {
  id: string;
  businessName: string;
  businessAddress: string;
  ward: string;
  subArea?: string;
  customerCategory:
    | "Office"
    | "Provision Store"
    | "Home"
    | "Retailer"
    | "Wholesaler"
    | "Restaurant"
    | "Hotel"
    | "Supermarket";
  phoneNumber: string;
  beverCode: string;
  verificationStatus: "Pending" | "Verified" | "Agent Visit";
  shopPhoto?: string;
  avatar?: string;
  coverPhoto?: string;
  createdAt: Date;
  hasPin: boolean;
}

// Re-export from profile types
export type { ProfileSettings, ProfileCompletion } from "./profile";

export interface Ward {
  name: string;
  code: string;
  sub_areas: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "Pending" | "Confirmed" | "Processing" | "Delivered" | "Cancelled";
  paymentMethod: "Transfer" | "Pay on Delivery";
  deliveryAddress: string;
  createdAt: Date;
  deliveredAt?: Date;
}

export interface Promo {
  id: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed" | "free_delivery";
  discountValue: number;
  validFrom: Date;
  validTo: Date;
  applicableCategories?: string[];
  minOrderAmount?: number;
  isActive: boolean;
}
