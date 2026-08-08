# Pending & Unknown API Endpoints

This document catalogs customer-oriented features that require verification or backend endpoint specifications before frontend implementation can proceed.

---

## 📑 Missing / Unconfirmed Backend Endpoints

### 1. Single Order Details (`GET /api/orders/:id`)
- **Status**: `UNKNOWN — backend/API confirmation required`
- **Context**: Needed for `/account/orders/[id]` view in the Customer Panel. Currently, the frontend only fetches `orderService.getMyOrders()`.

### 2. Standalone Address Book Management (`/api/users/addresses`)
- **Status**: `UNKNOWN — backend/API confirmation required`
- **Context**: Currently, user shipping addresses are submitted embedded inside `userService.updateProfile` or `orderService.createOrder`. Separate endpoints for listing, adding, updating, and deleting multiple saved addresses are pending confirmation.

### 3. Wishlist Management (`/api/wishlist`)
- **Status**: `UNKNOWN — backend/API confirmation required`
- **Context**: No wishlist API logic exists in `src/services/`.

### 4. Account Deletion / Data Export (`DELETE /api/users/profile`)
- **Status**: `UNKNOWN — backend/API confirmation required`
- **Context**: Useful for privacy & settings section in Customer Panel (`/account/settings`).

---

## 🛠 Procedure When New Endpoints are Provided
1. Add service method in the corresponding `src/services/<service>.js` file.
2. Update `/docs/api/api-inventory.md` with endpoint path and status.
3. Remove item from this document once verified.
