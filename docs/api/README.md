# API Integration Documentation

This folder contains the complete technical specification for all backend REST APIs integrated into the Storefront application.

---

## 📁 Documentation Index
- [API Client Setup](api-client.md) — Axios configuration, credentials, and base URL handling.
- [API Master Inventory](api-inventory.md) — Comprehensive table of all endpoints, authentication requirements, and statuses.
- [Authentication API](authentication.md) — User login, registration, email verification, session, and password endpoints.
- [Products & Categories API](products.md) — Public product listing, single item retrieval, and category endpoints.
- [Customer Profile API](customers.md) — Profile retrieval, updates, and password changes.
- [Cart API](cart.md) — Cart retrieval, item addition, quantity updates, removal, and clearing.
- [Orders API](orders.md) — Order placement, user order history, and administrative updates.
- [Wishlist API](wishlist.md) — Status and analysis of wishlist capabilities (Currently UNKNOWN).
- [Pending / Unknown Endpoints](unknown-or-pending.md) — Unconfirmed backend APIs requiring team confirmation.

---

## 🏷 Endpoint Status Definitions
- `Existing`: Endpoints implemented in `src/services/` and active in the storefront.
- `UNKNOWN — backend/API confirmation required`: Endpoints referenced conceptually but unconfirmed in current API services.
