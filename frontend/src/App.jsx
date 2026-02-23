import React from "react";   // ✅ YE LINE ADD KARO
import { Routes, Route } from "react-router-dom";

import SignUp from "./Components/SignUp/SignUp";
import AddProduct from "./Components/AddProduct/AddProduct";
import ProductList from "./Components/ViewProduct/ViewProduct";
import EditProduct from "./Components/EditProduct/EditProduct";
import SignIn from "./Components/SignIn/SignIn";
import Dashboard from "./Components/HomePage/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/view-products" element={<ProductList />} />
      <Route path="/edit-products/:id" element={<EditProduct />} />
    </Routes>
  );
}

export default App;