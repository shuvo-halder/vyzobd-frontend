# Authentication & Authorization Architecture

This document details how user identity, session management, route protection, and permissions are handled across the storefront application.

---

## 🔄 Authentication Workflow

```text
User Submits Credentials
        │
        ▼
   POST /api/auth/login
        │
        ▼
Backend validates credentials & sets HTTP-Only Cookie
        │
        ▼
Frontend receives 200 OK & invokes refreshUser()
        │
        ▼
   GET /api/auth/me  (Sends cookie via withCredentials: true)
        │
        ▼
AuthContext updates user state -> isAuthenticated = true
        │
        ▼
Protected Routes Render Content
```

---

## 🛠 Context & Hooks Implementation

### `AuthContext.jsx`
- **State Properties**:
  - `user`: User payload object (`{ _id, name, email, role, ... }`) or `null`.
  - `loading`: Boolean state indicating whether session validation (`getMe`) is pending.
  - `isAuthenticated`: Boolean (`!!user`).
  - `isAdmin`: Boolean (`user?.role === "admin"`).
- **Core Methods**:
  - `refreshUser()`: Invokes `authService.getMe()`, sets `user` state.
  - `login(credentials)`: Calls `authService.login(credentials)` then `refreshUser()`.
  - `register(userData)`: Calls `authService.register(userData)`.
  - `logout()`: Calls `authService.logout()` then sets `user` to `null`.

---

## 🛡 Protection & Guards

### Admin Route Guard (`src/app/admin/layout.jsx`)
Currently, the `/admin` route structure is guarded at the layout level:
```javascript
useEffect(() => {
  if (loading) return;

  if (!isAuthenticated) {
    router.replace("/login");
    return;
  }

  if (!isAdmin) {
    router.replace("/");
  }
}, [loading, isAuthenticated, isAdmin, router]);
```

### Customer Route Protection
- Public pages (`/`, `/products`, `/about`) are accessible to all visitors.
- Protected customer actions (e.g., viewing order details or checkout) rely on `isAuthenticated` checks or backend cookie validation.

---

## 🔑 Cookie & Security Setup
- **Storage**: Authentication tokens are stored inside **HTTP-Only Cookies** managed by the Express.js backend.
- **Client Transmission**: Every API request sent via `src/lib/axios.js` includes `withCredentials: true`, ensuring cookies are attached automatically without exposing tokens to client JavaScript or `localStorage`.
