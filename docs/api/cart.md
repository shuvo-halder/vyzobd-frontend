# Shopping Cart API Specification

This document details all shopping cart REST endpoints provided by `src/services/cart.service.js`.

---

## 1. Get Cart

### Endpoint
`GET /api/cart`

### Used By
- `src/context/CartContext.jsx` (calculates total count on mount)
- `src/app/(shop)/cart/page.jsx` (Cart view)

### Authentication
Authenticated / Session Cookie (`withCredentials: true`)

### Response Example
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "product": {
          "_id": "60d5ecb8b5c9c22b1c8b9999",
          "name": "Minimalist Cotton T-Shirt",
          "price": 1250,
          "images": ["/products/tshirt1.jpg"]
        },
        "quantity": 2,
        "selectedVariant": "M / Black"
      }
    ],
    "totalPrice": 2500
  }
}
```

---

## 2. Add to Cart

### Endpoint
`POST /api/cart`

### Used By
- `src/components/shared/AddToCartForm.jsx`
- Product Detail Page

### Request Payload
```json
{
  "productId": "60d5ecb8b5c9c22b1c8b9999",
  "quantity": 1,
  "selectedVariant": "L / White"
}
```

---

## 3. Update Cart Item Quantity

### Endpoint
`PUT /api/cart`

### Used By
- `src/app/(shop)/cart/page.jsx`

### Request Payload
```json
{
  "productId": "60d5ecb8b5c9c22b1c8b9999",
  "quantity": 3
}
```

---

## 4. Remove Item from Cart

### Endpoint
`DELETE /api/cart`

### Used By
- `src/app/(shop)/cart/page.jsx`

### Request Payload
```json
{
  "data": {
    "productId": "60d5ecb8b5c9c22b1c8b9999"
  }
}
```

---

## 5. Clear Entire Cart

### Endpoint
`DELETE /api/cart/clear`

### Used By
- Checkout completion / Clear cart action
