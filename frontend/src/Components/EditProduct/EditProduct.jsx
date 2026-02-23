import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { base_uri } from "../../api/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: ""
  });

  useEffect(() => {
    axios.get(`${base_uri}/products/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${base_uri}/products/update/${id}`, data);
      alert("Product Updated ✅");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={updateProduct}
        className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200 animate-fadeIn"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8 animate-pulse">
          Edit Product
        </h2>

        {/* Name */}
        <input
          name="name"
          value={data.name || ""}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full mb-4 px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-blue-300 text-blue-700"
        />

        {/* Price */}
        <input
          name="price"
          value={data.price || ""}
          onChange={handleChange}
          placeholder="Price"
          className="w-full mb-4 px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-blue-300 text-blue-700"
        />

        {/* Category */}
        <input
          name="category"
          value={data.category || ""}
          onChange={handleChange}
          placeholder="Category"
          className="w-full mb-4 px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-blue-300 text-blue-700"
        />

        {/* Stock */}
        <input
          name="stock"
          value={data.stock || ""}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full mb-4 px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-blue-300 text-blue-700"
        />

        {/* Image URL */}
        <input
          name="image"
          value={data.image || ""}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full mb-4 px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-blue-300 text-blue-700"
        />

        {/* Image Preview */}
        {data.image && (
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 hover:scale-105 transform transition duration-300 shadow-lg shadow-green-200/50"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}