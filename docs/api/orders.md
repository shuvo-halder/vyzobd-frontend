# Orders API Specification

This document details all order placement, customer history, and order management REST endpoints provided by `src/services/order.service.js`.

---

## 1. Create Order (Checkout)

### Endpoint
`POST /api/orders`

### Used By
- `src/app/(shop)/checkout/page.jsx`

### Authentication
Authenticated (`withCredentials: true`)

### Request Payload Example
```json
{
  "items": [
    {
      "product": "60d5ecb8b5c9c22b1c8b9999",
      "quantity": 2,
      "price": 1250
    }
  ],
  "shippingAddress": {
    "name": "Jane Doe",
    "phone": "01700000000",
    "street": "123 Dhanmondi",
    "city": "Dhaka",
    "postalCode": "1209"
  },
  "paymentMethod": "CashOnDelivery",
  "subtotal": 2500,
  "shippingCost": 100,
  "total": 2600
}
```

---

## 2. Get My Orders (Customer History)

### Endpoint
`GET /api/orders/my-orders`

### Used By
- `src/app/(shop)/orders/page.jsx`
- Target Customer Panel (`/account/orders`)

### Authentication
Authenticated

### Response Example
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d5ecb8b5c9c22b1c8b1111",
      "createdAt": "2026-08-01T12:00:00.000Z",
      "total": 2600,
      "orderStatus": "Processing",
      "paymentStatus": "Pending",
      "items": [
        {
          "product": {
            "name": "Minimalist Cotton T-Shirt",
            "images": ["/products/tshirt1.jpg"]
          },
          "quantity": 2,
          "price": 1250
        }
      ]
    }
  ]
}
```

---

## 3. Admin Orders Endpoints

### Endpoints
- `GET /api/orders` (Get all system orders)
- `PUT /api/orders/:id/status` (Update order status e.g., Pending -> Shipped -> Delivered)
- `PUT /api/orders/:id/payment` (Update payment status e.g., Paid / Unpaid)
- `DELETE /api/orders/:id` (Delete order)

### Used By
- `src/app/admin/orders/page.jsx`
- `src/app/admin/page.jsx`
