"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleAuthentication } from "@/app/apiActions";
import LoadingOverlay from "./LoadingOverlay";

const LoginPopup = ({ isOpen, setIsLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const [failed, setFailed] = useState(false)

  if (!isOpen) return null; // Return nothing if the popup is not open

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await handleAuthentication("login", formData);
    if (result) {
      localStorage.setItem("token", result);
      router.push("/careers/manage");
    } else {
      setFailed(true)
      console.log("Login failed");
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent Enter from submitting the form automatically
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <LoadingOverlay isLoading={isLoading} />
      <div className="bg-white rounded-lg shadow-2xl w-[90%] max-w-md p-8 relative">
        {/* Close Button */}
        <button
          onClick={() => setIsLogin(false)}
          className="absolute top-5 right-4 text-2xl text-red-500 hover:text-red-300 focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-green-800 text-center mb-4">Log In</h2>
        <form
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          className="space-y-6"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          {failed ? 
          <span
          className="text-red-500"
          >
            Login failed, please check your email and password.
          </span>
          : ''}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all"
          >
            Log In
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default LoginPopup;
