import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_uri } from "../../api/api";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${base_uri}/products`, {
        withCredentials: true, 
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Dashboard
          </h2>

          <Link to="/add-product">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              + Add Product
            </button>
          </Link>
        </div>

        {/* Products */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No products found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {p.name}
                </h4>

                <p className="text-gray-600 mb-4">
                  Price: <span className="font-medium">₹{p.price}</span>
                </p>

                <Link to={`/edit-products/${p._id}`}>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                    Edit
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}