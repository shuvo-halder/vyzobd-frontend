# High-Level System Architecture

This document describes the high-level architecture of the Vyzobd E-Commerce platform, emphasizing the separation of concerns between the Express.js backend and the Next.js storefront frontend.

---

## 🏛 System Topology

The platform operates as a decoupled single-vendor ecommerce application:

```text
┌─────────────────────────────────────────────────────────┐
│                      STOREFRONT                         │
│                    (Next.js 16)                         │
│                                                         │
│   ┌─────────────────────┐     ┌─────────────────────┐   │
│   │  Public Storefront  │     │   Customer Panel    │   │
│   │ (Products, Cart,    │     │   (/account - User  │   │
│   │  Checkout, Pages)   │     │   Profile & Orders) │   │
│   └──────────┬──────────┘     └──────────┬──────────┘   │
└──────────────┼───────────────────────────┼──────────────┘
               │                           │
               │ HTTP REST Requests        │ Cookie Credentials
               │ (Axios Instance)          │ (withCredentials: true)
               ▼                           ▼
┌─────────────────────────────────────────────────────────┐
│                      BACKEND                            │
│                    (Express.js)                         │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │                REST API Services                │   │
│   │   (/api/auth, /api/products, /api/orders, etc) │   │
│   └────────────────────────┬────────────────────────┘   │
└────────────────────────────┼────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────┐
│                     DATABASE                            │
│                    (MongoDB)                            │
└─────────────────────────────────────────────────────────┘
```

---

## 🧩 Architectural Responsibilities

### 1. Express.js REST API Backend
- **Data Persistence**: Stores and manages product catalogs, categories, users, orders, and cart items.
- **Session & Auth Management**: Issues HTTP-only authentication cookies or tokens.
- **Business Logic**: Validates order totals, stock availability, and payment processing.
- **Separate Admin Panel**: An independent, dedicated Admin Panel exists separately on the backend side for platform management.

### 2. Next.js Storefront Frontend (This Codebase)
- **Framework**: Next.js 16 (App Router) with React 19 and Tailwind CSS v4.
- **Public Commerce Experience**: Product catalog, search, filtering, single product details, shopping cart, and checkout.
- **Authentication Pages**: User login, registration, email verification, and password recovery.
- **Panel Migration Goal**: Transforming the internal storefront `/admin` layout into a customer-facing **Customer Panel** (`/account`).

---

## 🔑 Key Communication Characteristics
- **Transport**: JSON REST over HTTP via custom Axios instance (`src/lib/axios.js`).
- **Base URL**: Dynamically configured via environment variable `NEXT_PUBLIC_API_URL`.
- **Session Credentials**: Requests include `withCredentials: true` to support cross-domain/same-site cookie authentication.
