import React from "react";
import axios from "axios";
import { base_uri } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${base_uri}/auth/logout`, {
        withCredentials: true,
      });

      alert("Logged out");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <h3 className="text-xl font-bold text-blue-600">
        My Shop
      </h3>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/home"
          className="text-gray-700 font-medium hover:text-blue-600 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/add-product"
          className="text-gray-700 font-medium hover:text-blue-600 transition"
        >
          Add Product
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}