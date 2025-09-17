export interface User {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  businessAddress: string;
  customerCategory: "offices" | "stores" | "individuals";
  businessName?: string;
  wardCode?: string;
  wardName?: string;
  subArea?: string;
  beverCode?: string;
  verificationStatus?: "pending" | "verified" | "agent-scheduled";
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: "water" | "soft-drinks";
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "confirmed" | "delivered";
  createdAt: Date;
  deliveryAddress: string;
}

export interface AuthContextType {
  user: User | null;
  login: (phoneNumber: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface RegisterData {
  fullName: string;
  phoneNumber: string;
  password: string;
  businessAddress: string;
  customerCategory: "offices" | "stores" | "individuals";
  businessName?: string;
  wardCode?: string;
  wardName?: string;
  subArea?: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export interface PinContextType {
  hasPin: boolean;
  isSettingRequired: boolean; // true when user is logged in but no PIN set yet
  setPin: (pin: string) => Promise<void>;
  verifyPin: (pin: string) => Promise<boolean>;
  changePin: (oldPin: string, newPin: string) => Promise<boolean>;
  clearPin: () => void;
}
