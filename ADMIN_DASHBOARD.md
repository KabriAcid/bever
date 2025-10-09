# Bever Admin Dashboard

A comprehensive admin dashboard for the Bever e-beverage ordering platform.

## Features

### Dashboard
- Real-time KPIs (revenue, active users, orders, ratings)
- Interactive revenue trend and weekly orders charts
- Recent transactions overview
- Skeleton loaders and smooth animations

### User Management
- Complete user list with search and filtering
- User status badges (active, inactive, suspended, pending)
- Account verification status
- Detailed user profiles with order history
- Quick actions (view, edit, lock/unlock)

### Product Catalog
- Product listing with stock management
- Bulk upload via CSV/Excel with preview
- Category, brand, and volume management
- Stock level tracking and availability status

### Pricing Management
- Global markup percentage controls
- Individual product pricing
- Service plan management
- Export pricing to CSV

### Transactions
- Complete order management system
- Status tracking (pending, confirmed, processing, delivered, cancelled)
- Payment verification
- Delivery category management
- Real-time status updates

### Referral System
- Track referrals between users
- Reward management (free packs, credits)
- Referral analytics
- Approval workflows

### Activity Log
- Complete audit trail
- Track all admin and user actions
- Export capabilities
- Filter by date, user, action type

### Notifications
- Push notifications to users
- System alerts
- Targeted messaging (all users, active, inactive)
- Multiple notification types (info, success, warning, error)

### Delivery & Location Management
- Manage delivery categories (express, scheduled, bulk)
- City and ward management
- Location prefix system (JAL for Jalingo, expandable)
- Scalable for nationwide expansion

### Settings
- Delivery time configuration
- VAT and service fee management
- Service toggles (ordering, payments)
- Maintenance mode

## Design System

### Colors
- **Primary:** Black (#000000)
- **Secondary:** Gray tones
- **Badges:** Status-specific colors (green, yellow, red, blue)

### Typography
- System font stack with Plus Jakarta Sans for digits
- Tabular numbers for consistent alignment

### Components
- Reusable UI primitives (StatCard, Table, Modal, Badge, Button, Input, Select)
- Skeleton loaders for all data-heavy components
- Framer Motion animations throughout

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- Recharts for data visualization
- React Router for navigation
- Supabase for database and authentication

## Database Schema

Complete PostgreSQL schema with:
- Users, Products, Transactions, Transaction Items
- Referrals, Activity Logs, Service Plans
- Locations, Wards, Delivery Categories
- Notifications, Settings
- Row Level Security (RLS) enabled on all tables
- Optimized indexes for performance

## Routes

- `/admin` - Dashboard
- `/admin/users` - User Management
- `/admin/products` - Product Catalog
- `/admin/pricing` - Pricing Management
- `/admin/transactions` - Transactions
- `/admin/referrals` - Referral System
- `/admin/activity` - Activity Log
- `/admin/notifications` - Notifications
- `/admin/locations` - Delivery & Locations
- `/admin/settings` - Settings

## Getting Started

```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```

## Future Enhancements

- Role-based access control (super admin, admin, manager)
- Advanced analytics and reporting
- Real-time notifications via WebSocket
- Integration with payment gateways
- SMS and email notification templates
- Advanced filtering and sorting
- Data export in multiple formats
- Mobile app for admin on-the-go
