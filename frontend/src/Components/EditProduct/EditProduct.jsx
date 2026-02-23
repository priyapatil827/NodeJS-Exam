import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { base_uri } from "../../api/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

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
      alert("Updated ✅");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={updateProduct}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Edit Product
        </h2>

        <input
          name="name"
          value={data.name || ""}
          onChange={handleChange}
          placeholder="Name"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="price"
          value={data.price || ""}
          onChange={handleChange}
          placeholder="Price"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="category"
          value={data.category || ""}
          onChange={handleChange}
          placeholder="Category"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="stock"
          value={data.stock || ""}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}