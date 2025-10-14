/*
  # Bever Admin Dashboard - Database Schema

  ## Overview
  Complete database schema for the Bever e-beverage ordering platform admin dashboard.

  ## New Tables

  ### `users`
  Business owners and customers who use the platform
  - `id` (uuid, primary key)
  - `business_name` (text) - Name of the business
  - `owner_name` (text) - Owner's full name
  - `email` (text, unique) - Email address
  - `phone` (text) - Phone number
  - `address` (text) - Physical address
  - `ward` (text) - Ward/location code
  - `user_status` (text) - active, inactive, suspended, pending
  - `account_status` (text) - verified, unverified, pending
  - `registration_date` (timestamp) - When user registered
  - `last_login` (timestamp) - Last login time
  - `total_orders` (integer) - Total number of orders
  - `total_spent` (numeric) - Total amount spent
  - `referral_code` (text, unique) - User's referral code
  - `referred_by` (uuid, nullable) - ID of referring user
  - `avatar_url` (text, nullable) - Profile picture URL
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

  ### `products`
  Beverage products available for order
  - `id` (uuid, primary key)
  - `name` (text) - Product name
  - `brand` (text) - Brand name
  - `category` (text) - Product category
  - `volume` (text) - Volume/size
  - `packaging` (text) - Packaging type
  - `price` (numeric) - Current price
  - `stock_level` (integer) - Current stock
  - `in_stock` (boolean) - Availability status
  - `image_url` (text, nullable) - Product image
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

  ### `transactions`
  Order transactions and purchases
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key) - References users
  - `order_date` (timestamp) - When order was placed
  - `delivery_date` (timestamp, nullable) - Scheduled/actual delivery
  - `amount` (numeric) - Total order amount
  - `status` (text) - pending, confirmed, processing, delivered, cancelled
  - `payment_status` (text) - pending, completed, failed, refunded
  - `items_count` (integer) - Number of items
  - `delivery_category` (text) - express, scheduled, bulk
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

  ### `transaction_items`
  Individual items within transactions
  - `id` (uuid, primary key)
  - `transaction_id` (uuid, foreign key) - References transactions
  - `product_id` (uuid, foreign key) - References products
  - `quantity` (integer) - Quantity ordered
  - `unit_price` (numeric) - Price per unit at time of order
  - `subtotal` (numeric) - Quantity * unit_price
  - `created_at` (timestamp)

  ### `referrals`
  Referral tracking and rewards
  - `id` (uuid, primary key)
  - `referrer_id` (uuid, foreign key) - User who referred
  - `referee_id` (uuid, foreign key) - User who was referred
  - `reward_status` (text) - pending, claimed, expired
  - `reward_type` (text) - Type of reward
  - `reward_value` (numeric) - Value of reward
  - `created_at` (timestamp)
  - `claimed_at` (timestamp, nullable)

  ### `activity_logs`
  Audit trail for all system activities
  - `id` (uuid, primary key)
  - `user_id` (uuid, nullable) - User who performed action
  - `user_name` (text) - Name of user/admin
  - `action` (text) - Action performed
  - `entity` (text) - Entity affected
  - `details` (text) - Additional details
  - `ip_address` (text, nullable) - IP address
  - `created_at` (timestamp)

  ### `service_plans`
  Subscription and service plans
  - `id` (uuid, primary key)
  - `name` (text) - Plan name
  - `validity` (text) - Duration of plan
  - `base_price` (numeric) - Base price
  - `status` (text) - active, inactive
  - `features` (jsonb) - Array of features
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

  ### `locations`
  States, cities, and delivery areas
  - `id` (uuid, primary key)
  - `state` (text) - State name
  - `city` (text) - City name
  - `prefix` (text) - Location prefix code
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

  ### `wards`
  Wards and sub-areas within locations
  - `id` (uuid, primary key)
  - `location_id` (uuid, foreign key) - References locations
  - `name` (text) - Ward name
  - `sub_areas` (jsonb) - Array of sub-area names
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

  ### `delivery_categories`
  Delivery type configurations
  - `id` (uuid, primary key)
  - `name` (text) - Category name
  - `description` (text) - Description
  - `estimated_time` (text) - Estimated delivery time
  - `active` (boolean) - Is active
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

  ### `notifications`
  System notifications
  - `id` (uuid, primary key)
  - `title` (text) - Notification title
  - `message` (text) - Message content
  - `type` (text) - info, success, warning, error
  - `target_users` (jsonb, nullable) - Array of target user IDs
  - `read` (boolean) - Read status
  - `created_at` (timestamp)

  ### `settings`
  System-wide settings
  - `id` (uuid, primary key)
  - `key` (text, unique) - Setting key
  - `value` (text) - Setting value
  - `updated_at` (timestamp)

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated admin users
  - Restrict public access

  ## Important Notes
  - All tables use UUID primary keys
  - Timestamps use `timestamptz` for timezone awareness
  - Default values set for common fields
  - Indexes created for frequently queried columns
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  owner_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  ward text NOT NULL,
  user_status text NOT NULL DEFAULT 'pending',
  account_status text NOT NULL DEFAULT 'unverified',
  registration_date timestamptz DEFAULT now(),
  last_login timestamptz,
  total_orders integer DEFAULT 0,
  total_spent numeric DEFAULT 0,
  referral_code text UNIQUE NOT NULL,
  referred_by uuid,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  category text NOT NULL,
  volume text NOT NULL,
  packaging text NOT NULL,
  price numeric NOT NULL,
  stock_level integer DEFAULT 0,
  in_stock boolean DEFAULT true,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_date timestamptz DEFAULT now(),
  delivery_date timestamptz,
  amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  payment_status text NOT NULL DEFAULT 'pending',
  items_count integer DEFAULT 0,
  delivery_category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transaction_items table
CREATE TABLE IF NOT EXISTS transaction_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id uuid NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity integer NOT NULL,
  unit_price numeric NOT NULL,
  subtotal numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referee_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reward_status text NOT NULL DEFAULT 'pending',
  reward_type text NOT NULL,
  reward_value numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  claimed_at timestamptz
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  user_name text NOT NULL,
  action text NOT NULL,
  entity text NOT NULL,
  details text NOT NULL,
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- Create service_plans table
CREATE TABLE IF NOT EXISTS service_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  validity text NOT NULL,
  base_price numeric NOT NULL,
  status text NOT NULL DEFAULT 'active',
  features jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state text NOT NULL,
  city text NOT NULL,
  prefix text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create wards table
CREATE TABLE IF NOT EXISTS wards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  name text NOT NULL,
  sub_areas jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create delivery_categories table
CREATE TABLE IF NOT EXISTS delivery_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  estimated_time text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info',
  target_users jsonb,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_referral_code ON users(referral_code);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(user_status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_order_date ON transactions(order_date DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referee_id ON referrals(referee_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaction_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE wards ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for authenticated users (admin dashboard)
CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update users"
  ON users FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can insert users"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage products"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can view all transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update transactions"
  ON transactions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can view transaction items"
  ON transaction_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can view all referrals"
  ON referrals FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update referrals"
  ON referrals FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can view activity logs"
  ON activity_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can create activity logs"
  ON activity_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can manage service plans"
  ON service_plans FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can manage locations"
  ON locations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can manage wards"
  ON wards FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can manage delivery categories"
  ON delivery_categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can manage notifications"
  ON notifications FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can manage settings"
  ON settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
