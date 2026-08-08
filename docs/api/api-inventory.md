# Master API Inventory

This document lists all backend REST API endpoints identified in the frontend codebase, along with their authentication requirements, service wrappers, and current status.

---

| Feature / Action | HTTP Method | Endpoint Path | Authentication | Service File & Method | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Login** | `POST` | `/api/auth/login` | Public | `authService.login` | Existing |
| **Register** | `POST` | `/api/auth/register` | Public | `authService.register` | Existing |
| **Logout** | `POST` | `/api/auth/logout` | Authenticated | `authService.logout` | Existing |
| **Get Current User** | `GET` | `/api/auth/me` | Authenticated | `authService.getMe` | Existing |
| **Forgot Password** | `POST` | `/api/auth/forgot-password` | Public | `authService.forgotPassword` | Existing |
| **Reset Password** | `POST` | `/api/auth/reset-password/:token` | Public | `authService.resetPassword` | Existing |
| **Verify Email** | `GET` | `/api/auth/verify-email/:token` | Public | `authService.verifyEmail` | Existing |
| **Resend Verification** | `POST` | `/api/auth/resend-verification` | Public | `authService.resendVerification` | Existing |
| **Get Profile** | `GET` | `/api/users/profile` | Authenticated | `userService.getProfile` | Existing |
| **Update Profile** | `PUT` | `/api/users/profile` | Authenticated | `userService.updateProfile` | Existing |
| **Change Password** | `PUT` | `/api/users/change-password` | Authenticated | `userService.changePassword` | Existing |
| **Get Cart** | `GET` | `/api/cart` | Authenticated / Session | `cartService.getCart` | Existing |
| **Add to Cart** | `POST` | `/api/cart` | Authenticated / Session | `cartService.addToCart` | Existing |
| **Update Cart** | `PUT` | `/api/cart` | Authenticated / Session | `cartService.updateCart` | Existing |
| **Remove Cart Item** | `DELETE` | `/api/cart` | Authenticated / Session | `cartService.removeItem` | Existing |
| **Clear Cart** | `DELETE` | `/api/cart/clear` | Authenticated / Session | `cartService.clearCart` | Existing |
| **Create Order** | `POST` | `/api/orders` | Authenticated | `orderService.createOrder` | Existing |
| **Get My Orders** | `GET` | `/api/orders/my-orders` | Authenticated | `orderService.getMyOrders` | Existing |
| **Get Single Order Details** | `GET` | `/api/orders/:id` | Authenticated | `UNKNOWN — backend/API confirmation required` | Pending |
| **Get All Products** | `GET` | `/api/products` | Public | `productService.getProducts` | Existing |
| **Get Single Product** | `GET` | `/api/products/:id` | Public | `productService.getProduct` | Existing |
| **Create Product** | `POST` | `/api/products` | Admin | `productService.createProduct` | Existing |
| **Update Product** | `PUT` | `/api/products/:id` | Admin | `productService.updateProduct` | Existing |
| **Delete Product** | `DELETE` | `/api/products/:id` | Admin | `productService.deleteProduct` | Existing |
| **Get Categories** | `GET` | `/api/categories` | Public | `categoryService.getCategories` | Existing |
| **Get Single Category** | `GET` | `/api/categories/:id` | Public | `categoryService.getCategory` | Existing |
| **Create Category** | `POST` | `/api/categories` | Admin | `categoryService.createCategory` | Existing |
| **Update Category** | `PUT` | `/api/categories/:id` | Admin | `categoryService.updateCategory` | Existing |
| **Delete Category** | `DELETE` | `/api/categories/:id` | Admin | `categoryService.deleteCategory` | Existing |
| **Get Admin Orders** | `GET` | `/api/orders` | Admin | `orderService.getAllOrders` | Existing |
| **Update Order Status** | `PUT` | `/api/orders/:id/status` | Admin | `orderService.updateOrderStatus` | Existing |
| **Update Payment Status** | `PUT` | `/api/orders/:id/payment` | Admin | `orderService.updatePaymentStatus` | Existing |
| **Delete Order** | `DELETE` | `/api/orders/:id` | Admin | `orderService.deleteOrder` | Existing |
| **Get Admin Users** | `GET` | `/api/admin/users` | Admin | `adminUserService.getUsers` | Existing |
| **Get Single Admin User** | `GET` | `/api/admin/users/:id` | Admin | `adminUserService.getUser` | Existing |
| **Update User Role** | `PUT` | `/api/admin/users/:id/role` | Admin | `adminUserService.updateRole` | Existing |
| **Delete User** | `DELETE` | `/api/admin/users/:id` | Admin | `adminUserService.deleteUser` | Existing |
| **Get Dashboard Overview** | `GET` | `/api/dashboard` | Admin | `dashboardService.getDashboard` | Existing |
| **Address Book APIs** | `GET`/`POST`/`DELETE` | `/api/users/addresses` | Authenticated | `UNKNOWN — backend/API confirmation required` | Pending |
| **Wishlist APIs** | `GET`/`POST`/`DELETE` | `/api/wishlist` | Authenticated | `UNKNOWN — backend/API confirmation required` | Pending |
