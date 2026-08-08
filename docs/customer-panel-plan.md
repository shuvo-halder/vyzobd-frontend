# Customer Panel Transformation Plan

This document outlines the strategic roadmap for transforming the Storefront's existing `/admin` routes into a dedicated, feature-rich **Customer Panel / My Account Panel** (`/account`).

---

## 🎯 Goal & Scope
The existing storefront contains an internal `/admin` section (Dashboard, Orders, Products, Users). Because administrative operations belong in the separate backend admin application, the internal panel in this codebase will be converted into a customer account portal.

---

## 🏛 Target Customer Panel Structure (`/account`)

The transformed customer portal will reside under `/account` (or `/profile`) with the following navigation layout:

```text
/account
├── /account/dashboard      # Overview: Recent orders, profile summary, quick stats
├── /account/profile        # Edit profile information & change password
├── /account/orders         # Customer order history & tracking status
├── /account/orders/[id]    # Detailed view for a single order
├── /account/addresses      # Address book management (Shipping / Billing)
├── /account/wishlist       # Saved customer favorite products
└── /account/settings       # Account notification & privacy settings
```

---

## 🔄 Conversion & Component Reuse Matrix

| Admin Component / Route | Current Purpose | Target Customer Component | Migration Strategy | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/admin/layout.jsx` | Admin Sidebar + Auth Guard | `/account/layout.jsx` | Replace admin guard with `isAuthenticated` check; convert sidebar to Customer Navigation | **REUSE WITH MODIFICATION** |
| `/src/components/shared/AdminSidebar.jsx` | Admin Navigation Links | `/src/components/shared/CustomerSidebar.jsx` | Update links to Customer routes (`/account/*`) and adjust branding/icons | **REUSE WITH MODIFICATION** |
| `/admin/page.jsx` | Admin System Stats | `/account/page.jsx` | Replace revenue/user stats with Customer Stats (Total Orders, Spent, Pending Deliveries, Saved Items) | **REUSE WITH MODIFICATION** |
| `/admin/orders/page.jsx` | All System Orders | `/account/orders/page.jsx` | Switch from `orderService.getAllOrders()` to `orderService.getMyOrders()` | **REUSE WITH MODIFICATION** |
| `/admin/products/page.jsx` | Product CRUD Operations | N/A | Remove from Storefront (Managed in external Admin backend) | **REMOVE / DEPRECATE** |
| `/admin/users/page.jsx` | User Role Management | N/A | Remove from Storefront (Managed in external Admin backend) | **REMOVE / DEPRECATE** |
| `/src/app/(shop)/profile/page.jsx` | Basic Profile Page | `/account/profile/page.jsx` | Integrate into main `/account` layout and bind with `userService` | **REUSE & CONSOLIDATE** |

---

## 🚦 Feature Readiness Matrix

| Feature | Backend API Availability | Frontend UI Status | Readiness Status |
| :--- | :--- | :--- | :--- |
| **Customer Profile** | `GET /api/users/profile`, `PUT /api/users/profile` | Exists (`src/app/(shop)/profile/page.jsx`) | **READY** |
| **Password Change** | `PUT /api/users/change-password` | Exists in Profile Form | **READY** |
| **Order History** | `GET /api/orders/my-orders` | Exists in `src/app/(shop)/orders/page.jsx` & `/admin/orders` | **READY** |
| **Order Details (`/orders/[id]`)** | `UNKNOWN — backend/API confirmation required` | Needs UI component | **PENDING API** |
| **Address Book Management** | `UNKNOWN — backend/API confirmation required` | Embedded in Profile/Checkout | **PENDING API** |
| **Wishlist** | `UNKNOWN — backend/API confirmation required` | Missing | **PENDING API** |

---

## 🔒 Safety & Phased Execution Protocol
1. **Preserve Current Functionality**: Do not delete `/admin` pages until new `/account` routes are fully built and verified.
2. **Incremental API Integration**: As new customer endpoints are provided by the backend team, integrate services under `src/services/` and add frontend hooks/pages.
3. **No Unrequested Refactoring**: Maintain existing component conventions and styling themes during the migration.
