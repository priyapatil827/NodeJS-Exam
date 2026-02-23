import React, { useState } from "react";
import axios from "axios";
import { base_uri } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      alert("All fields are required ❌");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${base_uri}/auth/signup`, formData);
      alert(res.data.message || "Signup successful ✅");
      setFormData({ name: "", email: "", password: "", role: "" });

      navigate("/signin");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 via-blue-50 to-gray-200 p-4">
      <form
        onSubmit={handleSignUp}
        className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200 animate-fadeIn"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8 animate-pulse">
          Create Your Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-5 px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-blue-300 text-blue-700"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-5 px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-blue-300 text-blue-700"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-5 px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-blue-300 text-blue-700"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full mb-7 px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-blue-700"
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 hover:scale-105 transform transition duration-300 shadow-lg shadow-blue-200/50"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-6 text-blue-700">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="font-semibold cursor-pointer hover:text-blue-900 hover:underline transition"
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
}