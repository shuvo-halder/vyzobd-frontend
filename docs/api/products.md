# Products & Categories API Specification

This document details all catalog, product listing, single item, and category management REST endpoints provided by `src/services/product.service.js` and `src/services/category.service.js`.

---

## 1. Get All Products

### Endpoint
`GET /api/products`

### Used By
- `src/app/(shop)/page.jsx` (Featured Products section)
- `src/app/(shop)/products/page.jsx` (Product Catalog)
- `src/app/admin/products/page.jsx`

### Authentication
Public

### Request Query Parameters
- `category` (optional)
- `search` (optional)
- `sort` (optional)
- `page` / `limit` (optional)

### Response Example
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d5ecb8b5c9c22b1c8b9999",
      "name": "Minimalist Cotton T-Shirt",
      "slug": "minimalist-cotton-tshirt",
      "price": 1250,
      "discountPrice": 990,
      "images": ["/products/tshirt1.jpg"],
      "category": {
        "_id": "60d5ecb8b5c9c22b1c8b8888",
        "name": "Apparel"
      },
      "stock": 45,
      "isFeatured": true
    }
  ]
}
```

---

## 2. Get Single Product

### Endpoint
`GET /api/products/:id`

### Used By
- `src/app/(shop)/products/[slug]/page.jsx`

### Authentication
Public

### Request
URL Parameter `:id` (Product ID or Slug)

---

## 3. Product Admin Endpoints (Create, Update, Delete)

### Endpoints
- `POST /api/products` (Create)
- `PUT /api/products/:id` (Update)
- `DELETE /api/products/:id` (Delete)

### Used By
- `src/app/admin/products/page.jsx`

### Authentication
Admin Role Required

---

## 4. Categories Endpoints

### Endpoints
- `GET /api/categories` (Public)
- `GET /api/categories/:id` (Public)
- `POST /api/categories` (Admin)
- `PUT /api/categories/:id` (Admin)
- `DELETE /api/categories/:id` (Admin)

### Service File
`src/services/category.service.js`
