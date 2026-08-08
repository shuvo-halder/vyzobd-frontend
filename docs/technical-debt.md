# Technical Debt & Code Risk Audit

This document cataloging existing code risks, anti-patterns, duplicated logic, and areas requiring future refactoring in the storefront codebase.

---

## 🚨 Critical Risks & Code Issues

### 1. Hardcoded / Fallback Image Paths
- **Issue**: Components import static local image files (`heroImg2.jpg`, `about2.jpg`) that did not exist in the repository tree.
- **Temporary Fix**: Standardized fallback references to available images (`heroImg1.jpg`, `about1.jpg`).
- **Recommendation**: Dynamic image URLs should come from backend API payloads or CDN paths rather than hardcoded local image imports.

### 2. Centralized Axios Interceptors & Network Failure Safeguard
- **Status**: HARDENED (Phase 1.5)
- **Resolution**: Updated `src/lib/axios.js` with a 15-second timeout and response interceptor logging network errors without causing infinite redirect loops. Navigation guards remain safely encapsulated in Next.js layout components (`AccountLayout`, `AdminLayout`).

### 3. Customer vs. Admin Panel Route Separation
- **Status**: HARDENED (Phase 1.5)
- **Resolution**: Created a dedicated Customer Panel under `/account/*` (`/account`, `/account/profile`, `/account/orders`, `/account/addresses`, `/account/wishlist`, `/account/settings`). Admin routes (`/admin/*`) remain isolated and guarded by `isAdmin`. Customer routes rely strictly on `isAuthenticated` without depending on admin roles.

### 4. Legacy Customer Route Consolidation
- **Status**: HARDENED (Phase 1.5)
- **Resolution**: Redirected legacy shop routes `/profile` and `/orders` to `/account/profile` and `/account/orders` respectively. Navbar dropdown links updated to point directly to `/account`.

### 5. Inconsistent State Synchronization in Effects
- **Issue**: Effects in `AdminSidebar.jsx` and `Navbar.jsx` update navigation states on route changes, triggering linter warnings for cascading renders if not carefully managed.
- **Recommendation**: Use Next.js event handlers or memoized route tracking to handle UI state cleanups.

### 6. Missing API Interceptors for Loading & Toast Notifications
- **Issue**: Every component manually handles `loading` states and toast alerts (`toast.success` / `toast.error`).
- **Recommendation**: Maintain consistent service wrappers or custom hooks (`useApi`) to reduce boilerplate.
