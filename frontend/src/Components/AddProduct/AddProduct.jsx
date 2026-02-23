import React, { useState } from "react";
import axios from "axios";
import { base_uri } from "../../api/api";

export default function AddProduct() {
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${base_uri}/products/add`, data);
      alert("Product Added ✅");
      setData({ name: "", price: "", category: "", stock: "" }); 
    } catch (err) {
      console.error(err);
      alert("Failed to add product ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Add Product
        </h2>

        <input
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="price"
          placeholder="Price"
          value={data.price}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="category"
          placeholder="Category"
          value={data.category}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="stock"
          placeholder="Stock"
          value={data.stock}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}