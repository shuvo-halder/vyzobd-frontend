# Customer Profile API Specification

This document details all customer user account management REST endpoints provided by `src/services/user.service.js`.

---

## 1. Get Customer Profile

### Endpoint
`GET /api/users/profile`

### Used By
- `src/app/(shop)/profile/page.jsx`
- Target Customer Panel (`/account/profile`)

### Authentication
Authenticated (`withCredentials: true`)

### Request
No body required.

### Response Example
```json
{
  "success": true,
  "data": {
    "_id": "60d5ecb8b5c9c22b1c8b4567",
    "name": "Jane Doe",
    "email": "user@example.com",
    "phone": "01700000000",
    "address": {
      "street": "123 Dhanmondi",
      "city": "Dhaka",
      "postalCode": "1209",
      "country": "Bangladesh"
    }
  }
}
```

---

## 2. Update Customer Profile

### Endpoint
`PUT /api/users/profile`

### Used By
- `src/components/shared/ProfileForm.jsx`

### Authentication
Authenticated

### Request
```json
{
  "name": "Jane Doe Updated",
  "phone": "01800000000",
  "address": {
    "street": "456 Gulshan Ave",
    "city": "Dhaka",
    "postalCode": "1212",
    "country": "Bangladesh"
  }
}
```

### Response Example
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { ... }
}
```

---

## 3. Change Password

### Endpoint
`PUT /api/users/change-password`

### Used By
- Profile / Password Change forms

### Authentication
Authenticated

### Request
```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword456!"
}
```

### Response Example
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```
