# Technical Debt & Code Risk Audit

This document cataloging existing code risks, anti-patterns, duplicated logic, and areas requiring future refactoring in the storefront codebase.

---

## 🚨 Critical Risks & Code Issues

### 1. Hardcoded / Fallback Image Paths
- **Issue**: Components import static local image files (`heroImg2.jpg`, `about2.jpg`) that did not exist in the repository tree.
- **Temporary Fix**: Standardized fallback references to available images (`heroImg1.jpg`, `about1.jpg`).
- **Recommendation**: Dynamic image URLs should come from backend API payloads or CDN paths rather than hardcoded local image imports.

### 2. Lack of Centralized Error Interceptor
- **Issue**: `src/lib/axios.js` defines a plain Axios instance without response interceptors for handling `401 Unauthorized` or `403 Forbidden` globally.
- **Impact**: Unauthenticated requests fail silently in individual service try/catch blocks instead of automatically redirecting to `/login` or triggering a token refresh.

### 3. Mixed Admin / Customer Panel Responsibilities
- **Issue**: The storefront codebase contains full Admin product management, category CRUD, user role changing, and revenue reporting (`/admin/*`).
- **Impact**: Confuses storefront security boundaries. Admin capabilities should be removed/deprecated in favor of customer account features (`/account/*`).

### 4. Duplicate Order Views
- **Issue**: Order listing logic exists in both `src/app/(shop)/orders/page.jsx` and `src/app/admin/orders/page.jsx`.
- **Recommendation**: Unify order listing into a reusable `<OrderList />` component driven by `orderService.getMyOrders()`.

### 5. Inconsistent State Synchronization in Effects
- **Issue**: Effects in `AdminSidebar.jsx` and `Navbar.jsx` update navigation states on route changes, triggering linter warnings for cascading renders if not carefully managed.
- **Recommendation**: Use Next.js event handlers or memoized route tracking to handle UI state cleanups.

### 6. Missing API Interceptors for Loading & Toast Notifications
- **Issue**: Every component manually handles `loading` states and toast alerts (`toast.success` / `toast.error`).
- **Recommendation**: Maintain consistent service wrappers or custom hooks (`useApi`) to reduce boilerplate.
