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
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-xl px-8 py-4 flex items-center justify-between border-b border-gray-200 sticky top-0 z-50">
      {/* Logo */}
      <h3 className="text-2xl font-extrabold text-blue-700 tracking-wide hover:text-blue-900 transition duration-300 cursor-pointer">
        My Shop
      </h3>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/home"
          className="text-gray-700 font-medium hover:text-blue-700 hover:scale-105 transform transition duration-300"
        >
          Dashboard
        </Link>

        <Link
          to="/add-product"
          className="text-gray-700 font-medium hover:text-blue-700 hover:scale-105 transform transition duration-300"
        >
          Add Product
        </Link>

        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transform hover:from-red-600 hover:to-pink-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}