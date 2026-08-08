# Customer Panel Migration Plan

This document defines the phase-by-phase execution plan for transforming the Storefront into a customer-centric account portal.

---

## 🎯 Target Architecture

The target Customer Portal will provide a unified account hub (`/account`) structured as follows:

```text
/account
├── /account (Overview Dashboard)
│   ├── Welcome banner & customer summary
│   ├── Quick stats: Total Orders, Pending Deliveries, Saved Items
│   └── Recent Order Activity
├── /account/orders (My Orders)
│   ├── Order listing with status pills & tracking
│   └── Quick re-order / invoice view
├── /account/profile (Personal Details)
│   ├── Name, Email, Phone number form
│   └── Security & Password Change form
├── /account/addresses (Address Book)
│   └── Default shipping & billing address management
├── /account/wishlist (Saved Items)
│   └── Grid of favorited items with quick Add-to-Cart
└── /account/settings (Preferences)
    └── Notification preferences & privacy options
```

---

## 🚀 Execution Phases

### Phase 1: Foundation & Customer Panel Layout (COMPLETED)
- [x] Audit codebase, existing services, API clients, and routes.
- [x] Create comprehensive documentation system under `/docs`.
- [x] Establish development protocols and change safety rules.
- [x] Create `/src/app/account/` layout and route architecture.
- [x] Implement `CustomerSidebar.jsx` with customer-centric navigation links.
- [x] Create `AccountLayout` (`/account/layout.jsx`) with strict `isAuthenticated` guard.
- [x] Assemble Customer Dashboard overview (`/account`) bound to real `orderService.getMyOrders()` data.
- [x] Integrate `/account/profile` (Profile & Security) and `/account/orders` (Order History).
- [x] Create UI shells for `/account/addresses`, `/account/wishlist`, and `/account/settings`.
- [x] Update Navbar user dropdown and mobile navigation to direct customers to `/account`.

### Phase 2: Pending Feature Integration (Upon API Availability)
- [ ] Integrate Single Order Detail view (`/account/orders/[id]`).
- [ ] Integrate Address Book APIs (`/account/addresses`).
- [ ] Integrate Wishlist APIs (`/account/wishlist`).

### Phase 3: Cleanup & Deprecation
- [ ] Deprecate legacy `/admin` storefront pages once external admin app handles store admin.
