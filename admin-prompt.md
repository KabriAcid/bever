# Bever Admin Dashboard – AI Builder Prompt

## Goal

Bever is an e-beverage ordering platform designed to eliminate the hassle of sourcing drinks for shop owners, hotels, restaurants, offices, and parties. Instead of going to the market, users can order beverages online for fast, reliable delivery. The platform is built for scalability, with plans to expand to all Nigerian states.

Build a robust, scalable Admin Dashboard for Bever that fully controls and monitors all client-side features, with advanced tools for analytics, notifications, transactions, user management, referral rewards, product catalog, pricing, and system settings.

## Design System & Visual Parity

- **Primary Color:** Black (`#000000` / `primary-950`), and gray as secondary.
- **Typography:** System font stack (`Raleway CDN`, `Segoe UI`, etc.).
- **Utility Classes:** Use existing Tailwind CSS custom classes (`btn-primary`, `card`, `input-field`, etc.).
- **Responsiveness:** Mobile-first, with responsive utilities for text, spacing, grid, table responsiveness with no scrollbars but scrollable, and icons.
- **Component Patterns:** Modular, feature-based, and scalable. UI primitives in `ui/`, shared logic in `shared/`.

## Directory Structure

Mirror the client structure for maintainability and scalability:

```
src/
  admin/
    components/      # Admin-specific React components
    contexts/        # Context providers (AdminAuth, Notifications, etc.)
    data/            # Mock/admin data (users, transactions, etc.)
    modals/          # Modal dialogs (edit, confirm, etc.)
    pages/           # Page-level components (Dashboard, Users, Pricing, etc.)
    types/           # TypeScript types/interfaces
    ui/              # Reusable UI primitives (StatCard, Table, Modal, etc.)
    utils/           # Utility functions
    shared/          # Shared components with client (LoadingScreen, SetPinModal, etc.)
    layouts/         # Layouts (AdminLayout with sidebar, topnav, main content)
```

## Core Features & Pages

### 1. **Dashboard**

- **Analytics:** KPIs (orders, revenue, active users, ratings, etc.), charts, and quick stats.
- **Notifications:** Real-time system/user notifications, order alerts, and activity feed.
- **Recent Activity:** Show latest transactions, user signups, and referral events.

### 2. **Users Management**

- **List/Search/Filter:** Search users, filter by account/registration status.
- **User Details:** Clicking the eye icon opens a detailed business owner profile clicking on edit opens modal and so on.
- **Actions:** Activate/deactivate, lock, reset PIN, view order history, manage referrals.

### 3. **Referral System**

- **Reward Tracking:** Track referrals, assign free packs or credits.
- **Referral Analytics:** See top referrers, reward status, and campaign effectiveness.

### 4. **Activity Page**

- **Audit Log:** Track all admin and user actions (orders, edits, logins, etc.).
- **Export/Filter:** Export logs, filter by date/type/user.

### 5. **Product Catalog Management**

- **Categories/Brands/Volumes:** Add, edit, delete categories, brands, packaging, and volume options (see client `HomePage.tsx` for structure).
- **Bulk Upload Modal:** Import products with preview of filename, size via CSV/Excel.
- **Inventory:** Manage stock levels so that user's can know if item is out of stock and so on, set availability.

### 6. **Pricing Management**

- **General Markup:** Set global percentage increments for all products/services.
- **Individual Pricing:** Edit prices for specific products/plans.
- **Service Plans:** Manage plans, validity, base price, status, and export to CSV.

### 7. **Transactions**

- **Order Management:** View/filter orders by status, change status, view details.
- **Payment Verification:** Confirm payments, manage refunds, and handle disputes.

### 8. **Notifications**

- **System Alerts:** Push notifications to users (order updates, promos, delivery alerts).
- **Admin Alerts:** Internal notifications for system events, errors, or required actions.

### 9. **Settings**

- **Delivery Times:** Set default delivery windows, manage time slots.
- **Service Toggles:** Enable/disable specific client services (e.g., ordering, payments).
- **VAT/Fees:** Configure VAT, service fees, and other charges.
- **Maintenance Mode:** Toggle app-wide maintenance or feature flags.

### 10. **Delivery & Location Management**

- **Delivery Categories:** Admin can add, edit, and manage delivery categories (e.g., express, scheduled, bulk delivery).
- **Local Government & Wards:** Manage the location data structure (see `jalingo_wards.d.ts` and `wards.txt`). Admin can add new cities, update prefixes (e.g., JAL for Jalingo, ZAR for Zaria), and edit wards/sub-areas for future expansion across Nigeria.
- **Scalable Location Model:** Ensure the system supports dynamic addition of new states, cities, wards, and sub-areas for nationwide scaling.

## Skeleton Loaders & Loading States

- Use skeleton loaders on component mount for all pages that fetch data (users, products, analytics, etc.).
- Create variants of skeleton components for cards (KPIs), tables, buttons, and other UI elements.
- Skeletons should match the design system (colors, border radius, spacing) and provide a smooth loading experience.
- Ensure loading states are handled gracefully, with transitions from skeleton to actual data.

## Additional Requirements

- **Protected Routes:** All admin pages must be protected by authentication.
- **Visual Parity:** Admin UI must match client design system for seamless experience.
- **Shared Components:** Use and extend shared UI primitives and modals.
- **Scalability:** Structure must support future features (role-based access, advanced analytics, etc.).
- **Mock Data:** Use mock data for development, with clear separation for future backend integration.

## References

- **Client ProfilePage:** For user/business details, PIN management, verification status, and quick actions.
- **Client HomePage:** For product catalog structure, filters, and grid layout.
- **User Management:** For user list, status badges, actions, and navigation to details.

## Usage

- Use this prompt to generate code step-by-step, following the design system and directory structure.
- Emphasize analytics, notifications, transactions, user/referral management, and pricing controls.
- Add comments where decisions are ambiguous or require clarification.
