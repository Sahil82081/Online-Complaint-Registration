import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { signup } from "../url/url"
export default function UserRegister() {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(signup, formData);
      console.log(response.data);
      localStorage.setItem("token",response.data.token);
      navigate("/user-dashboard");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-600 via-slate-700 to-slate-900">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
          User Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-slate-700 mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-slate-700 mb-1 font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-slate-700 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-slate-700 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-slate-700 mb-1 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-slate-700 text-white py-2 rounded-lg font-semibold hover:bg-slate-800 transition"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-slate-600 mt-4">
          Already have an account?{" "}
          <span className="text-gray-700 cursor-pointer hover:underline"
            onClick={() => { navigate('/user-login') }}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
