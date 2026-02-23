import React, { useState } from "react";
import axios from "axios";
import { base_uri } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${base_uri}/auth/signin`, formData);
      alert("Login successful ✅");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 via-blue-50 to-gray-200 p-4">
      <form
        onSubmit={handleSignIn}
        className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200 animate-fadeIn"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8 animate-pulse">
          Welcome Back
        </h2>

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          onChange={handleChange}
          className="w-full mb-5 px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-blue-300 text-blue-700"
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Your Password"
          onChange={handleChange}
          className="w-full mb-7 px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-blue-300 text-blue-700"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 hover:scale-105 transform transition duration-300 shadow-lg shadow-blue-200/50"
        >
          Sign In
        </button>

        <p className="text-sm text-center mt-5 text-blue-700">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="font-semibold cursor-pointer hover:text-blue-900 hover:underline transition"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}