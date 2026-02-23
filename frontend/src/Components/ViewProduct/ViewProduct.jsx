import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_uri } from "../../api/api";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${base_uri}/products`).then((res) => {
      setProducts(res.data);
    });
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    await axios.delete(`${base_uri}/products/delete/${id}`);
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Product List
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition flex flex-col"
            >
              {/* Product Image */}
              <img
                src={p.image || "https://via.placeholder.com/150"}
                alt={p.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />

              {/* Product Info */}
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{p.name}</h4>
              <p className="text-gray-600 mb-2">
                Price: <span className="font-medium">₹{p.price}</span>
              </p>
              <p className="text-gray-500 mb-4">Category: {p.category || "N/A"}</p>

              {/* Buttons */}
              <div className="mt-auto flex gap-2">
                <Link to={`/edit/${p._id}`}>
                  <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}