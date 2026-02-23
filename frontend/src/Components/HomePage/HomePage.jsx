import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_uri } from "../../api/api";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // For modal

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${base_uri}/products`, { withCredentials: true });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load products ❌");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${base_uri}/products/delete/${id}`, { withCredentials: true });
      alert("Product deleted ✅");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product ❌");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition flex flex-col"
              >
                {/* Product Image */}
                <img
                  src={
                    p.image
                      ? `${base_uri}${p.image}` // prepend base URI so frontend can access backend upload
                      : "https://dummyimage.com/150x150/cccccc/000000&text=No+Image"
                  }
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                  onError={(e) =>
                    (e.target.src = "https://dummyimage.com/150x150/cccccc/000000&text=No+Image")
                  }
                />

                {/* Product Info */}
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{p.name}</h4>
                <p className="text-gray-600 mb-2">
                  Price: <span className="font-medium">₹{p.price}</span>
                </p>
                <p className="text-gray-500 mb-4">Category: {p.category || "N/A"}</p>

                {/* Buttons */}
                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    View
                  </button>
                  <Link to={`/edit-products/${p._id}`}>
                    <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id)}
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

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-md p-6 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>

            <img
              src={
                selectedProduct.image
                  ? `${base_uri}${selectedProduct.image}`
                  : "https://dummyimage.com/150x150/cccccc/000000&text=No+Image"
              }
              alt={selectedProduct.name}
              className="w-full h-52 object-cover rounded-xl mb-4"
              onError={(e) =>
                (e.target.src = "https://dummyimage.com/150x150/cccccc/000000&text=No+Image")
              }
            />

            <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h3>
            <p className="text-gray-600 mb-2">
              Price: <span className="font-medium">₹{selectedProduct.price}</span>
            </p>
            <p className="text-gray-500 mb-2">Category: {selectedProduct.category || "N/A"}</p>
            <p className="text-gray-500">Stock: {selectedProduct.stock || "N/A"}</p>
          </div>
        </div>
      )}
    </>
  );
}