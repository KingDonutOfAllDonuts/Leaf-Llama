"use client";

import Navbar from "@/components/Navbars/Navbar";
import { useState, useEffect } from "react";
import { fetchAccountData, handleAuthentication } from "../apiActions";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/components/LoadingOverlay";
import LoginPopup from "@/components/LoginPopup";
import { useSetAtom } from "jotai";
import { vegetableAtom } from "@/lib/store";

const Careers = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    vegetable: "",
    whyVegetable: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [loginIsOpen, setIsLogin] = useState(false);
  const setVegetable = useSetAtom(vegetableAtom);
  const [failed, setFailed] = useState(false);
  const router = useRouter();
  useEffect(() => {
    //check if already logged on
    const token = localStorage.getItem("token");
    if (token && token != "false") {
      fetchAccountData(token)
        .then((result) => {
          if (result) {
            router.push("/careers/manage");
          }
        })
        .catch((err) => console.log("no account"));
    }
    setFadeIn(true); // Trigger the fade-in effect
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    setIsLoading(true);
    const result = await handleAuthentication("signup", formData);
    localStorage.setItem("token", result);
    if (result) {
      console.log("signup success");
      setVegetable(formData.vegetable);
      router.push(`/careers/celebrate`);
      return true;
    } else {
      console.log("signup failure");
      setFailed(true);
      setIsLoading(false);
      return false;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent Enter from submitting the form
    }
  };

  return (
    <div
      className={`w-full relative flex flex-col ${fadeIn ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
    >
      <LoadingOverlay isLoading={isLoading} />
      <Navbar />
      <h1 className="w-full text-center text-5xl mt-20 p-10 font-kaushan bg-white">
        Apply Now!
      </h1>
      <div className="flex flex-col items-center">
        <form
          className="w-full max-w-xl bg-white rounded-lg p-8 space-y-6"
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="vegetable" className="text-lg text-gray-500">
              If you were a vegetable, what would you be?{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              id="vegetable"
              name="vegetable"
              value={formData.vegetable}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded-md p-2 mt-1"
              required
            >
              <option value="" disabled className="p-3">
                Select your vegetable
              </option>
              <option value="Potato">Potato</option>
              <option value="Broccoli">Broccoli</option>
              <option value="Carrot">Carrot</option>
              <option value="Apple">Apple</option>
              <option value="Lettuce">Lettuce</option>
            </select>
            <div className="flex flex-col">
              <label htmlFor="why" className="text-lg text-gray-500 mt-2">
                Why? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="whyVegetable"
                name="whyVegetable"
                placeholder="Explain why you chose this vegetable"
                value={formData.whyVegetable}
                onChange={handleChange}
                className="border-2 border-gray-300 rounded-md p-2 mt-1 h-32 resize-none"
                maxLength={2500}
                required
              ></textarea>
              <p className="text-sm text-gray-500 mt-1 ">
                {2500 - formData.whyVegetable.length} characters remaining
              </p>
            </div>
            {failed ? (
              <span className="text-red-500">
                Application failed, check your email, it may be in use or the
                server may be down.
              </span>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-300 border-black transition-all"
          >
            Apply
          </button>
        </form>
        <button
          className="text-orange-500 hover:underline pb-5 -mt-5"
          onClick={() => setIsLogin(true)}
        >
          Already with us? Log In
        </button>
      </div>
      {/* login popip */}
      <LoginPopup setIsLogin={setIsLogin} isOpen={loginIsOpen} />
    </div>
  );
};

export default Careers;
