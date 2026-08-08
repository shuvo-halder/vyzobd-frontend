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

### Phase 1: Analysis & Documentation (COMPLETED)
- [x] Audit codebase, existing services, and routes.
- [x] Create comprehensive documentation system under `/docs`.
- [x] Establish development protocols and change safety rules.

### Phase 2: Customer Layout & Sidebar Construction (NEXT PHASE)
- [ ] Create `/src/app/(shop)/account/` directory structure.
- [ ] Implement `CustomerSidebar.jsx` with customer navigation links.
- [ ] Create `AccountLayout` with `isAuthenticated` guard.

### Phase 3: Order History & Profile Migration
- [ ] Migrate `getMyOrders` integration into `/account/orders`.
- [ ] Migrate profile and password forms into `/account/profile`.
- [ ] Assemble Customer Dashboard overview (`/account`).

### Phase 4: Pending Feature Integration (Upon API Availability)
- [ ] Integrate Single Order Detail view (`/account/orders/[id]`).
- [ ] Integrate Address Book APIs (`/account/addresses`).
- [ ] Integrate Wishlist APIs (`/account/wishlist`).

### Phase 5: Cleanup & Deprecation
- [ ] Deprecate legacy `/admin` storefront pages once `/account` is verified.
- [ ] Update Navbar profile links to point directly to `/account`.
