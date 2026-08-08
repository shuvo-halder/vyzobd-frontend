# API Client Architecture

This document specifies the HTTP client setup, environment configuration, credentials handling, and service pattern used throughout the storefront.

---

## ⚙️ Axios Configuration (`src/lib/axios.js`)

All API calls flow through a single centralized Axios instance:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default api;
```

### Configuration Parameters
- **`baseURL`**: Populated via environment variable `NEXT_PUBLIC_API_URL`. Points to the Express.js API server (e.g., `http://localhost:5000` or production domain).
- **`withCredentials: true`**: Mandatory setting that ensures browser HTTP cookies (session tokens, JWT cookies) are attached to cross-origin or same-site requests automatically.

---

## 📂 Service Layer Pattern

Instead of invoking Axios directly inside React components, API requests are encapsulated in dedicated service files under `src/services/`:

```text
src/services/
├── auth.service.js       # Authentication & password management
├── user.service.js       # Customer profile & account settings
├── cart.service.js       # Shopping cart operations
├── order.service.js      # Order creation & history
├── product.service.js    # Catalog & single product fetching
├── category.service.js   # Category listings
├── adminUser.service.js  # Admin user management
└── dashboard.service.js  # Admin dashboard reporting
```

---

## 🔄 Response & Error Conventions
- **Axios Promise**: Service methods return raw Axios Promise objects (`api.get(...)`, `api.post(...)`).
- **Component Consumption**: Components unwrap the response destructured as `{ data }` inside `try/catch` blocks.
- **Error Propagation**: Errors are caught in components, where `error?.response?.data?.message` is displayed via `react-hot-toast` alerts.
