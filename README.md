# Bever

Design and generate a premium, minimalist, UX-focused, mobile-first beverages ordering app UI named Bever (focused on water and soft drinks delivery in Jalingo) using:

- React + TypeScript + Vite
- React Router DOM
- TailwindCSS
- Framer Motion
- Lucide Icons
- (Optional) JS location-detection for auto-filling address/wards

---

## Routing

The app should support multiple pages with routes such as:

- `/login`
- `/register`
- `/home`
- `/cart`
- `/checkout`
- `/profile`

---

## Flow Requirements

### 1) Registration Stage (Business/Shop Entry)

Fields:

- Business/Shop Name
- Business/Shop Address (street, ward, landmark)
- Customer Category (Office, Provision Store, Home)
- Phone Number

Use ward data from `jalingo_wards.json` to power ward selection and sub-area hints.

### 2) Shop Photo Upload

- Require at least one photo of the shop facade or business front.
- Guidance: “Upload a clear photo showing your shop’s building or entrance.”
- Offline-first: keep data locally until upload succeeds.

### 3) Customer Code Assignment

- On registration, generate a unique Bever Code: `[CITYCODE]-[WARD]-[CATEGORY]-[ID]`
- Example: `JAL-02-OF-0102` → Jalingo Ward 02, Office, Customer ID 102.
- Show code in Profile and use it as a delivery reference.

### 4) Verification Levels

- Pending Verification (default after registration)
- Verified (Photo Approved)
- Agent Verification Scheduled (optional; for large/suspicious accounts)
- Show the status clearly on Profile with badges (orange = Pending, green = Verified).

### 5) Profile Integration

Profile includes:

- Business/Shop Info (editable)
- Shop Photo (re-upload option)
- Bever Code (non-editable)
- Verification Status (Pending / Verified / Agent Visit)
- Option to request verification update if shop location changes

---

## Transaction PIN (Finance)

To secure payments and sensitive actions, Bever includes a persistent Transaction PIN flow:

- After a successful login or registration, if the user has no PIN set, a Transaction PIN modal overlays the app and remains visible until a 4–6 digit PIN is created.
- The PIN requirement is user-specific and persisted in `localStorage` (demo only). In production, store a hashed/encrypted PIN server-side.
- Users can manage their PIN in the Profile page: set (if missing), change (old → new), or clear the PIN.

Technical implementation:

- `PinContext` (`src/contexts/PinContext.tsx`) exposes `hasPin`, `isSettingRequired`, `setPin(pin)`, `verifyPin(pin)`, `changePin(oldPin,newPin)`, and `clearPin()`.
- `TransactionPinModal` (`src/components/TransactionPinModal.tsx`) enforces the modal until a valid PIN is saved.
- `App.tsx` wraps the app with `PinProvider` and shows `TransactionPinModal` whenever a user is logged in and `isSettingRequired` is true.

---

## Catalog & Product Details

- Display beverages organized into a structured hierarchy:

  - **Category** → Water | Soft Drinks
  - **Brand** → Coca-Cola, Pepsi, Eva, Swan, etc.
  - **Branch/Packaging** → Sachet, Bottle, Can
  - **Volume Options** → 50cl, 75cl, 1L, 1.5L, etc.
  - **Purchase Unit** → Pack (e.g., 12, 24) or Piece

- Search and filter options.
- Product grid/cards with quick access to add-to-cart.

---

## Cart, Checkout, and Payment

- Slide-in or mobile-friendly cart page.
- Items with adjustable quantities and quick amount buttons.
- Order summary with totals.
- Checkout flow leading to payment.
- Payment: clear order summary and virtual account instructions (copy-to-clipboard), status from Pending → Confirmed.

---

## Profile Page

- User details (name, phone, business address, customer category).
- Editable profile info.
- Order history.
- Logout functionality.
- PIN management: set/change/clear Transaction PIN.
- Verification status + Bever Code display

---

## Components

- `AuthForms.tsx` (Register + Login with beverage-specific fields)
- `Navbar.tsx`
- `ProductCard.tsx`
- `CartSidebar.tsx`
- `CheckoutForm.tsx`
- `PaymentInstructions.tsx`
- `ProfilePage.tsx` (+ PIN management)
- `AppLayout.tsx` with bottom navigation (Home, Orders, Profile, Cart).
- `TransactionPinModal.tsx` (new)

---

## Product Data Structure Example

Provide a product schema that organizes beverages by category, brand, packaging, volume, and unit. For example:

```
Category: Water
  Brand: Eva
    Branch: Bottle
      Volume: 75cl
        Unit: Pack (12), Piece

Category: Soft Drinks
Brand: Coca-Cola
Branch: Can
Volume: 33cl
Unit: Pack (24), Piece
```

---

## Design Guidelines

- Mobile-first, simple, and professional
- Verification flow should feel trustworthy, not burdensome
- Use clear prompts and status badges (orange = Pending, green = Verified)
- Ensure key flows work offline-first (data saved until upload)

---

## Development

- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

Note: Beverages focus on water and soft drinks; structure should allow future extension to juices, energy drinks, etc.
