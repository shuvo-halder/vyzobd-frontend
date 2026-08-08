# Current Admin Panel Codebase Audit

This document deconstructs the internal Admin Panel layout, pages, components, and services currently located under `src/app/admin/`.

---

## 🏛 Structure & Key Files

```text
src/app/admin/
├── layout.jsx                # Layout wrapper with AdminSidebar & Auth Guard
├── page.jsx                  # Dashboard overview (stats grid, recent orders, monthly target)
├── orders/
│   └── page.jsx              # All system orders table, status update dropdowns
├── products/
│   └── page.jsx              # Product CRUD modal form & product data table
└── users/
    └── page.jsx              # User list & role management dropdown
```

---

## 📊 Comprehensive Route Audit & Reuse Analysis

| Current Admin Route | File Path | API Endpoints Used | Reusable for Customer Panel? | Action |
| :--- | :--- | :--- | :--- | :--- |
| `/admin` | `src/app/admin/page.jsx` | `GET /api/dashboard` | **Yes (UI Structure)** | Convert cards to Customer Stats (Total Orders, Pending Shipments, Total Spent) |
| `/admin/orders` | `src/app/admin/orders/page.jsx` | `GET /api/orders`, `PUT /api/orders/:id/status`, `PUT /api/orders/:id/payment` | **Yes (Table Layout)** | Replace admin query with `orderService.getMyOrders()` and remove edit dropdowns |
| `/admin/products` | `src/app/admin/products/page.jsx` | `GET/POST/PUT/DELETE /api/products` | **No** | Deprecate/Remove from Storefront (Belongs in external Admin app) |
| `/admin/users` | `src/app/admin/users/page.jsx` | `GET/PUT/DELETE /api/admin/users` | **No** | Deprecate/Remove from Storefront (Belongs in external Admin app) |
| Admin Layout | `src/app/admin/layout.jsx` | `AuthContext` (`isAdmin`, `isAuthenticated`) | **Yes (Layout Container)** | Convert auth guard from `isAdmin` to `isAuthenticated` |
| Admin Sidebar | `src/components/shared/AdminSidebar.jsx` | `useAuth`, `usePathname` | **Yes (Sidebar Component)** | Refactor links to point to `/account/*` customer routes |

---

## 🎨 UI Assets & Features Worth Preserving
1. **Responsive Drawer Layout**: The mobile overlay drawer and desktop fixed sidebar mechanism in `AdminSidebar.jsx` is clean, robust, and accessible.
2. **Data Tables & Status Badges**: The order history table layout with status pill badges (`Processing`, `Shipped`, `Delivered`) provides a great baseline for customer order tracking.
3. **Stat Cards**: The minimalist stat cards in `src/app/admin/page.jsx` fit the customer account overview section well.
