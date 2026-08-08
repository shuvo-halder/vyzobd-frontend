# Wishlist API Analysis

This document records the current status and technical analysis of Wishlist feature support in the storefront application.

---

## 📌 Current Status
`UNKNOWN — backend/API confirmation required`

---

## 🔍 Codebase Inspection
A complete audit of `src/services/` and `src/components/` revealed:
1. No `wishlist.service.js` or wishlist endpoint handlers exist in the current codebase.
2. No wishlist UI components or buttons exist in `src/components/shared/ProductCard.jsx` or product detail pages.

---

## 🚀 Future Requirements for Customer Panel Wishlist
When backend support for Wishlist is introduced, the following endpoints should be documented and implemented:

```text
GET /api/wishlist            # Get user's saved wishlist items
POST /api/wishlist           # Add product to wishlist
DELETE /api/wishlist/:id     # Remove product from wishlist
```

### Proposed Component Integration
- Add heart toggle button on `ProductCard.jsx`.
- Build `/account/wishlist` view inside the Customer Panel.
