# Frontend Architecture

This document details the frontend directory layout, routing strategy, component hierarchy, state management, and styling setup in the Next.js storefront application.

---

## 📁 Directory Structure & Key Files

```text
/
├── .env.example                       # Environment variables manifest
├── next.config.mjs                    # Next.js configuration (standalone, allowed origins)
├── package.json                       # Dependencies and project metadata
├── postcss.config.mjs                 # PostCSS setup (@tailwindcss/postcss)
├── public/                            # Static assets, logos, and product/hero images
└── src/
    ├── app/                           # Next.js App Router Root
    │   ├── (auth)/                    # Route Group: Authentication screens
    │   │   ├── login/page.jsx
    │   │   ├── register/page.jsx
    │   │   ├── forgot-password/page.jsx
    │   │   ├── check-email/page.jsx
    │   │   ├── verify-email/[token]/page.jsx
    │   │   └── resend-verification/page.jsx
    │   ├── (shop)/                    # Route Group: Public Storefront
    │   │   ├── page.jsx               # Home Page
    │   │   ├── layout.jsx             # Public Shop Layout (Navbar + Footer)
    │   │   ├── products/
    │   │   │   ├── page.jsx           # Product Catalog
    │   │   │   └── [slug]/page.jsx    # Product Details
    │   │   ├── cart/page.jsx          # Shopping Cart
    │   │   ├── checkout/page.jsx      # Order Checkout
    │   │   ├── orders/page.jsx        # Order History
    │   │   ├── profile/page.jsx       # User Profile
    │   │   ├── about/page.jsx         # Static Brand Pages
    │   │   ├── contact/page.jsx
    │   │   ├── faq/page.jsx
    │   │   ├── privacy/page.jsx
    │   │   ├── refund/page.jsx
    │   │   ├── sustainability/page.jsx
    │   │   └── terms/page.jsx
    │   ├── account/                   # Route Group: Customer Panel Portal
    │   │   ├── layout.jsx             # Customer Sidebar + Auth Guard Layout (/account)
    │   │   ├── page.jsx               # Customer Overview Dashboard
    │   │   ├── profile/page.jsx       # Profile & Password Change
    │   │   ├── orders/page.jsx        # Order History
    │   │   ├── addresses/page.jsx     # Saved Address Book Shell
    │   │   ├── wishlist/page.jsx      # Wishlist Shell
    │   │   └── settings/page.jsx     # Customer Preferences & Security
    │   ├── admin/                     # Route Group: Legacy Admin Panel (Independent Auth)
    │   │   ├── layout.jsx             # Admin Sidebar + Auth Guard Layout
    │   │   ├── page.jsx               # Admin Dashboard Overview
    │   │   ├── orders/page.jsx        # Admin Order Management
    │   │   ├── products/page.jsx      # Admin Product Management
    │   │   └── users/page.jsx         # Admin User Management
    │   ├── globals.css                # Tailwind CSS v4 directives & theme variables
    │   └── layout.jsx                 # Root Layout with AuthProvider & CartProvider
    ├── config/                        # Navigation and UI configurations
    │   └── navigation.js              # Single Source of Truth for Storefront Navigation
    ├── components/
    │   ├── home/                      # Homepage specific sections (HeroSlider, FeaturedProducts, NewsLetter)
    │   └── shared/                    # Reusable UI (Navbar, Footer, ProductCard, AddToCartForm, AdminSidebar, etc.)
    │       └── header/                # Modular Header Components (SearchBar, MobileDrawer)
    ├── context/                       # React Context Providers
    │   ├── AuthContext.jsx            # Global User Auth State
    │   └── CartContext.jsx            # Global Cart Count State
    ├── hooks/                         # Custom React Hooks
    │   ├── useAuth.js                 # Consumes AuthContext
    │   └── useCart.js                 # Consumes CartContext
    ├── lib/                           # Utility & API configurations
    │   ├── api.js                     # Legacy API helper wrappers
    │   └── axios.js                   # Centralized Axios instance
    ├── services/                      # API Service Abstractions
    │   ├── auth.service.js            # Auth endpoints
    │   ├── user.service.js            # Customer profile endpoints
    │   ├── cart.service.js            # Cart endpoints
    │   ├── order.service.js           # Order endpoints
    │   ├── product.service.js         # Product endpoints
    │   ├── category.service.js        # Category endpoints
    │   ├── adminUser.service.js       # Admin user management endpoints
    │   └── dashboard.service.js       # Admin dashboard stats endpoints
    └── utils/                         # Helper functions & export utilities
        ├── downloadDashboardReport.js # PDF report generator (jspdf)
        ├── exportOrdersToCSV.js       # CSV Exporter for Orders
        └── exportProductsToCSV.js     # CSV Exporter for Products
```

---

## 🎨 Styling System
- **Framework**: Tailwind CSS v4 using `@import "tailwindcss";` in `src/app/globals.css`.
- **Theme Variables**: Defined in `src/app/globals.css`:
  - `--color-primary`: `#111827` (Dark neutral / Charcoal)
  - `--color-secondary`: `#f3f4f6` (Light neutral gray)
  - `--color-accent`: `#dd2c53` (Vibrant pink/red)
  - `--radius-md`: `0.5rem`
  - `--radius-lg`: `0.75rem`
- **Icon Library**: `lucide-react` and `react-icons` (FiIcons).

---

## ⚡ State Management Pattern
1. **Auth State (`AuthContext.jsx`)**:
   - Holds `user` object, `loading` boolean, and computed properties (`isAuthenticated`, `isAdmin`).
   - Automatically invokes `authService.getMe()` on mount to restore user session from backend cookies.
2. **Cart State (`CartContext.jsx`)**:
   - Tracks `cartCount` state.
   - Fetches cart items count from `cartService.getCart()` on initial render.
3. **Local Page State**:
   - Pages use standard React `useState` and `useEffect` hooks for fetching data via services.

---

## 🏛️ Header & Navigation Architecture (Phase 2 UI-1, UI-1.1, UI-1.2 & UI-1.3 Refinement)
- **Single Source of Truth (`src/config/navigation.js`)**: Both Desktop and Mobile headers consume `NAV_ITEMS` and `CATEGORY_PLACEHOLDERS`.
- **Desktop Header (`src/components/shared/Navbar.jsx`)**:
  - **Top Row**: Compact height layout (`py-2.5`) featuring prominently sized store logo (`h-11 lg:h-12 w-auto`, ~44-48px height using `/public/logos/logo.svg`), central SearchBar (`SearchBar.jsx`), and customer account dropdown / cart count actions.
  - **Bottom Row**: Horizontal navigation links with hoverable category dropdown preview, and customer hotline contact info (`h-11`).
- **Mobile Header & Drawer (`src/components/shared/header/MobileDrawer.jsx`)**:
  - Compact mobile top bar (`h-14`) with working hamburger toggle button (`handleOpenDrawer`), centered logo (`h-9 w-auto`), and cart badge.
  - Slide-over off-canvas drawer with backdrop, Escape key listener, body scroll lock, search input, vertical category accordion, and account action footer.
- **Responsive Logo Strategy**:
  - **SVG Viewport Optimization**: Optimized `/public/logos/logo.svg`'s `viewBox` from `0 0 64 64` (with ~50% vertical empty whitespace) to a tight `1 11 62 31` (2:1 widescreen aspect ratio), removing vertical padding so that the actual visible logo artwork fills the rendered container.
  - Desktop / Large Desktop: `h-11 lg:h-12 w-auto` (~44-48px visual height) providing a highly professional and visible brand anchor.
  - Mobile & Drawer: `h-9 w-auto` (~36px visual height) maintaining compact 56px (`h-14`) mobile bar proportions.
- **Backend API Integration Status**: Navigation menu and category dropdown endpoints are currently frontend abstractions ready for future `navigation.service.js` integration.
