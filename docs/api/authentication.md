# Authentication API Specification

This document details all authentication and account security REST endpoints provided by `src/services/auth.service.js`.

---

## 1. Login User

### Endpoint
`POST /api/auth/login`

### Used By
- `src/app/(auth)/login/page.jsx`
- `AuthContext.jsx` (`login` action)

### Authentication
Public

### Request
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

### Response Example
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "60d5ecb8b5c9c22b1c8b4567",
    "name": "Jane Doe",
    "email": "user@example.com",
    "role": "customer"
  }
}
```

### Frontend Usage
```javascript
import { authService } from "@/services/auth.service";
await authService.login({ email, password });
```

---

## 2. Register User

### Endpoint
`POST /api/auth/register`

### Used By
- `src/app/(auth)/register/page.jsx`

### Authentication
Public

### Request
```json
{
  "name": "Jane Doe",
  "email": "user@example.com",
  "password": "Password123!",
  "phone": "01700000000"
}
```

### Response Example
```json
{
  "success": true,
  "message": "Registration successful. Please verify your email."
}
```

---

## 3. Get Current User (`Me`)

### Endpoint
`GET /api/auth/me`

### Used By
- `AuthContext.jsx` (`refreshUser` on initial load)

### Authentication
Authenticated (Cookie required via `withCredentials: true`)

### Request
No request body required.

### Response Example
```json
{
  "success": true,
  "user": {
    "_id": "60d5ecb8b5c9c22b1c8b4567",
    "name": "Jane Doe",
    "email": "user@example.com",
    "role": "customer",
    "isVerified": true
  }
}
```

---

## 4. Logout User

### Endpoint
`POST /api/auth/logout`

### Used By
- `AuthContext.jsx` (`logout` action)
- Navbar & Sidebar sign-out buttons

### Authentication
Authenticated

### Request
No request body. Clears server-set authentication cookie.

---

## 5. Forgot Password

### Endpoint
`POST /api/auth/forgot-password`

### Used By
- `src/app/(auth)/forgot-password/page.jsx`

### Authentication
Public

### Request
```json
{
  "email": "user@example.com"
}
```

---

## 6. Reset Password

### Endpoint
`POST /api/auth/reset-password/:token`

### Used By
- `src/app/(auth)/forgot-password/[token]/page.jsx`

### Authentication
Public

### Request
```json
{
  "password": "NewSecurePassword123!"
}
```

---

## 7. Verify Email & Resend Verification

### Endpoints
- `GET /api/auth/verify-email/:token`
- `POST /api/auth/resend-verification`

### Used By
- `src/app/(auth)/verify-email/[token]/page.jsx`
- `src/app/(auth)/resend-verification/page.jsx`
