# 🛒 ShopKart - Full Stack E-Commerce Website

ShopKart is a full-stack e-commerce web application built from scratch using modern web technologies.

The project currently supports user authentication, product browsing, shopping cart management, checkout, order creation, and order history.

---

## 🚀 Project Status

### Current Progress

- ✅ Project setup
- ✅ React frontend
- ✅ Node.js + Express backend
- ✅ MySQL database
- ✅ REST APIs
- ✅ User registration
- ✅ User login
- ✅ JWT authentication
- ✅ Protected routes
- ✅ Product listing
- ✅ Product details
- ✅ Shopping cart
- ✅ Checkout
- ✅ Delivery address
- ✅ Order creation
- ✅ Order items
- ✅ My Orders
- ✅ Order status display

### Not Implemented Yet

- ⏳ Wishlist
- ⏳ Admin Dashboard
- ⏳ Admin Product Management
- ⏳ Product Image Upload
- ⏳ Admin Order Management
- ⏳ Payment Gateway
- ⏳ Order Cancellation
- ⏳ Advanced Search & Filters
- ⏳ Stock Management
- ⏳ Deployment

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- JavaScript
- React Router DOM
- Axios
- HTML5
- CSS3

## Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- bcrypt

## Database

- MySQL

## Development Tools

- VS Code
- MySQL Workbench
- Postman
- Git
- GitHub

---

# 📁 Project Structure

```text
ecommerce-project/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── Orders.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── authRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
