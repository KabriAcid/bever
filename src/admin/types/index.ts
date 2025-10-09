export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';
export type AccountStatus = 'verified' | 'unverified' | 'pending';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type DeliveryCategory = 'express' | 'scheduled' | 'bulk';

export interface User {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  ward: string;
  userStatus: UserStatus;
  accountStatus: AccountStatus;
  registrationDate: string;
  lastLogin: string;
  totalOrders: number;
  totalSpent: number;
  referralCode: string;
  referredBy?: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  volume: string;
  packaging: string;
  price: number;
  stockLevel: number;
  inStock: boolean;
  imageUrl?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  orderDate: string;
  deliveryDate?: string;
  amount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: number;
  deliveryCategory: DeliveryCategory;
}

export interface Referral {
  id: string;
  referrerId: string;
  referrerName: string;
  refereeId: string;
  refereeName: string;
  date: string;
  rewardStatus: 'pending' | 'claimed' | 'expired';
  rewardType: string;
  rewardValue: number;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  details: string;
  ipAddress?: string;
}

export interface ServicePlan {
  id: string;
  name: string;
  validity: string;
  basePrice: number;
  status: 'active' | 'inactive';
  features: string[];
}

export interface Location {
  id: string;
  state: string;
  city: string;
  prefix: string;
  wards: Ward[];
}

export interface Ward {
  id: string;
  name: string;
  subAreas: string[];
}

export interface DeliveryCategoryData {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  active: boolean;
}

export interface KPI {
  label: string;
  value: string | number;
  change?: number;
  icon: any;
}

export interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  targetUsers?: string[];
}
