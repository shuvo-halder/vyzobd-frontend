# Route Mapping Matrix

This document presents a side-by-side comparison between the current storefront routes and the proposed customer panel routes.

---

| Current Route | Current Role | Proposed Route | Proposed Role | Transition Action |
| :--- | :--- | :--- | :--- | :--- |
| `/admin` | Admin Stats Overview | `/account` | Customer Dashboard | Convert UI to display user's recent orders & stats |
| `/admin/orders` | All System Orders | `/account/orders` | Customer Order History | Bind to `orderService.getMyOrders()` |
| N/A | N/A | `/account/orders/[id]` | Order Details & Tracking | Create new page upon API confirmation |
| `/src/app/(shop)/profile/page.jsx` | User Profile Page | `/account/profile` | Edit Profile & Password | Consolidate into `/account` layout |
| N/A | N/A | `/account/addresses` | Saved Address Book | Create new page upon API confirmation |
| N/A | N/A | `/account/wishlist` | Saved Favorites | Create new page upon API confirmation |
| N/A | N/A | `/account/settings` | Preferences | Create new page |
| `/admin/products` | Admin Product CRUD | N/A | Removed | Move to external Admin backend |
| `/admin/users` | Admin User CRUD | N/A | Removed | Move to external Admin backend |

---

## 🔒 Route Protection Rules
- **Public Routes**: `/`, `/products`, `/products/[slug]`, `/cart`, `/about`, `/contact`, `/privacy`, etc.
- **Guest-Only Routes**: `/login`, `/register`, `/forgot-password`, `/verify-email/*`
- **Customer Protected Routes**: `/account/*`, `/checkout` (Requires `isAuthenticated === true`).
