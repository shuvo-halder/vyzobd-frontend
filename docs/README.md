# Technical Documentation System — Vyzobd E-Commerce Storefront

Welcome to the technical documentation system for the **Vyzobd E-Commerce Storefront**. This documentation serves as the single source of truth for the frontend architecture, API integration, authentication model, existing Admin panel analysis, and the roadmap for migrating into a dedicated Customer Panel.

---

## 📁 Documentation Map

### Core Architecture & Strategy
- [Architecture Overview](architecture.md) — System boundaries, full-stack separation, and high-level topology.
- [Frontend Architecture](frontend-architecture.md) — Directory structure, Next.js App Router layout, routing groups, styling, and state management.
- [Authentication System](authentication.md) — End-to-end authentication flow, session persistence, cookies, and route protection.
- [Customer Panel Plan](customer-panel-plan.md) — Strategic plan for transforming the in-storefront Admin view into a customer-centric account management hub.
- [Technical Debt & Risk Audit](technical-debt.md) — Analysis of risky code patterns, missing error boundaries, and refactoring items.
- [Development Protocol](development-protocol.md) — Standard operating procedure for introducing new API endpoints and customer features safely.

### API Integration System (`/docs/api/`)
- [API Overview & Guidelines](api/README.md) — Overview of the API layer, conventions, and status indicators.
- [API Client Configuration](api/api-client.md) — Axios setup, base URL, `withCredentials`, and service pattern.
- [API Inventory Table](api/api-inventory.md) — Master index of all endpoints detected in the codebase.
- [Authentication API](api/authentication.md) — Login, register, logout, me, verification, and password reset endpoints.
- [Products & Categories API](api/products.md) — Public and admin product/category management endpoints.
- [Customer Profile API](api/customers.md) — Profile retrieval, update, and password change endpoints.
- [Cart API](api/cart.md) — Shopping cart retrieval, mutation, item removal, and clearing.
- [Orders API](api/orders.md) — Order creation, user order history, and status updates.
- [Wishlist API](api/wishlist.md) — Status and analysis of wishlist capabilities (Currently UNKNOWN).
- [Pending / Unknown Endpoints](api/unknown-or-pending.md) — Missing backend endpoints requiring API verification.

### Customer Panel Migration (`/docs/customer-panel/`)
- [Customer Panel Overview](customer-panel/README.md) — Objectives and scope of the Customer Panel transformation.
- [Current Admin Panel Analysis](customer-panel/current-admin-panel.md) — Deconstruction of existing `/admin` routes, pages, and reusable components.
- [Migration Plan](customer-panel/migration-plan.md) — Step-by-step conversion matrix mapping features to readiness states.
- [Route Map](customer-panel/route-map.md) — Current vs proposed route map (`/admin` -> `/account`).

---

## 🔒 Document Guidelines & Rules
1. **Zero Guesswork**: Every endpoint, request payload, and response structure documented here is verified directly from source code.
2. **Explicit Unknown Marker**: Any missing or unconfirmed backend feature is explicitly tagged as `UNKNOWN — backend/API confirmation required`.
3. **Non-Destructive Approach**: Documentation guides future incremental refactoring without breaking existing storefront functionality.
