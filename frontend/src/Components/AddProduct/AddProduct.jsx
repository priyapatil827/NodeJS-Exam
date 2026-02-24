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
  const [imageFile, setImageFile] = useState(null); // store actual file
  const [preview, setPreview] = useState(null); // for live preview

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("stock", data.stock);
      if (imageFile) formData.append("image", imageFile);

      axios.post(`${base_uri}/products/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product Added ✅");
      setData({ name: "", price: "", category: "", stock: "" });
      setImageFile(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add product ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 via-blue-50 to-gray-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200 animate-fadeIn"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8 animate-pulse">
          Add New Product
        </h2>

        <input
          name="name"
          placeholder="Product Name"
          value={data.name}
          onChange={handleChange}
          className="w-full mb-5 px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-blue-300 text-blue-700"
        />

        <input
          name="price"
          placeholder="Price"
          value={data.price}
          onChange={handleChange}
          className="w-full mb-5 px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-blue-300 text-blue-700"
        />

        <input
          name="category"
          placeholder="Category"
          value={data.category}
          onChange={handleChange}
          className="w-full mb-5 px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-blue-300 text-blue-700"
        />

        <input
          name="stock"
          placeholder="Stock"
          value={data.stock}
          onChange={handleChange}
          className="w-full mb-5 px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-blue-300 text-blue-700"
        />

        <input
          type="file"
          name="image" 
          accept="image/*"
          onChange={handleImageChange}
          className="w-full mb-3"
        />

        {preview && (
          <div className="w-full mb-5">
            <p className="text-gray-500 mb-2 text-sm">Image Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-40 object-cover rounded-xl border border-gray-300"
              onError={(e) =>
                (e.target.src = "https://dummyimage.com/150x150/cccccc/000000&text=No+Image")
              }
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 hover:scale-105 transform transition duration-300 shadow-lg shadow-blue-200/50"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}