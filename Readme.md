# 🛒 E-Commerce Platform (Node.js + React + JWT)

## 📌 Project Overview
Full-stack **E-commerce app** with:
- 👤 Multi-user support (Admin & User)
- 🔑 JWT-based authentication via cookies
- 📦 Product CRUD (Add/Edit/View)
- 🏷️ Category support
- 🧩 Role-based route protection
- 🎨 React + Tailwind CSS frontend

---

## 🗂 Folder Structure


ecommerce-platform/
├─ backend/
│  ├─ config/
│  │  └─ db.js                # MongoDB connection
│  ├─ controllers/
│  │  ├─ authController.js    # SignUp, SignIn, Logout
│  │  └─ productController.js # CRUD for products
│  ├─ middleware/
│  │  └─ authMiddleware.js    # JWT verification, role protection
│  ├─ models/
│  │  ├─ User.js
│  │  └─ Product.js
│  ├─ routes/
│  │  ├─ authRoute.js
│  │  └─ productRoute.js
│  ├─ server.js
│  └─ .env
│
├─ frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ Components/
│  │  │  ├─ SignUp.jsx
│  │  │  ├─ SignIn.jsx
│  │  │  ├─ Dashboard.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ AddProduct.jsx
│  │  │  └─ EditProduct.jsx
│  │  ├─ api/
│  │  │  └─ api.js
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ package.json
│  └─ vite.config.js




---

## ⚡ Features

- 👤 **Sign Up / Sign In / Logout**
- 📦 **Add, Edit, Delete Products**
- 🏷️ **Category assignment**
- 🔑 **JWT authentication**
- 🔒 **Secure cookie storage**
- 🧩 **Role-based access (Admin/User)**
- 🎨 **Tailwind CSS UI**

---

## 🚀 Setup

### Backend

cd backend
npm install
# create .env with PORT, MONGO_URI, JWT_SECRET
node server.js




## 🌐 Routes

**Authentication**
| Route      | Method | Role | Description |
|-----------|--------|------|------------|
| /signup   | POST   | all  | Register a new user |
| /signin   | POST   | all  | Login user |
| /logout   | GET    | all  | Logout user |

**Products**
| Route                     | Method | Role       | Description             |
|----------------------------|--------|------------|-------------------------|
| /products                  | GET    | all        | List all products       |
| /products/add              | POST   | admin      | Add a new product       |
| /products/update/:id       | PUT    | admin/user | Update product details  |
| /products/:id              | GET    | all        | Get single product info |


🎨 Frontend Pages

/ → SignUp

/login → SignIn

/dashboard → Product list & add button

/add-product → Add Product Form

/edit-product/:id → Edit Product Form

✅ Notes

Users see only their own products

Admins can manage all products

Tailwind CSS for all forms, buttons, and dashboard cards

JWT stored in HTTP-only cookie for security





https://github.com/user-attachments/assets/5805b82a-e9c8-4aa7-b380-7b0300a7e5f3


