"use client";
import React, { useState } from "react";
import Title from "../Title";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { HiMiniArrowLeftEndOnRectangle } from "react-icons/hi2";
import { navButtons } from "@/lib/constants";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

import Apple from "@/public/account/Apple.jpg";
import Broccoli from "@/public/account/Broccoli.jpg";
import Carrot from "@/public/account/Carrot.jpg";
import Lettuce from "@/public/account/Lettuce.jpg";
import Potato from "@/public/account/Potato.jpg";
import Image from "next/image";

const getVegetableImage = (vegetable) => {
  switch (vegetable) {
    case "Apple":
      return Apple;
    case "Broccoli":
      return Broccoli;
    case "Carrot":
      return Carrot;
    case "Lettuce":
      return Lettuce;
    case "Potato":
      return Potato;
    default:
      return Apple; // Default image if no match
  }
};

const ManageNavbar = ({ account }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const handleProfileClick = () => {
    console.log("Navigating to profile information...");
    // Navigate to profile info page
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/careers");
    // Add logout logic
  };
  console.log(account);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      {/* Navbar */}
      <nav className="z-[900] flex h-[85px] items-center justify-between px-6 py-2.5 fixed w-full bg-white border-b-4 border-orange-600">
        <h2 className="text-2xl text-gray-800 font-mono tracking-wide mr-5">
          Manage Orders
        </h2>

        <Title top={false} />

        {/* Menu Icon */}
        <div className="flex flex-row">
          {/* Profile Dropdown */}
          {account ? (
            <Image
              src={getVegetableImage(account.vegetable)}
              alt={""}
              className="h-[50px] mt-[20px] w-[50px] ml-32 cursor-pointer hover:opacity-75 transition-all hover:-translate-y-0.5 rounded-full aspect-square border border-orange-500"
              onClick={toggleProfileMenu}
            />
          ) : (
            <FaUserCircle
              className="h-[85px] w-[45px] ml-32 cursor-pointer hover:opacity-75 transition-all hover:-translate-y-0.5"
              onClick={toggleProfileMenu}
            />
          )}

          <IoIosMenu
            onClick={toggleMenu}
            className="h-[85px] w-[45px] ml-5 cursor-pointer hover:opacity-75 transition-all hover:-translate-y-0.5"
          />
        </div>
      </nav>
      <div
        className={`absolute right-14 mt-[80px] w-[200px] bg-white rounded-lg shadow-lg border z-[1000] transition-all duration-300 ease-in-out ${
          isProfileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <ul className="text-black text-sm font-medium">
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={handleProfileClick}
          >
            Profile Information
          </li>
          <li
            className="px-4 py-2 hover:bg-red-100 transition-all cursor-pointer border-t text-red-950"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>

      <div
        className={`absolute right-2 mt-[80px] w-[200px] bg-white rounded-lg shadow-lg border z-[1000] transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <ul className="flex-col">
          <li className="hover:opacity-80 cursor-pointer text-gray-800 relative group hover:bg-gray-100 p-2 border-t">
            <Link href={`/`} className="flex items-center justify-between">
              <span>HOME</span>
              <span className="opacity-0 duration-300 group-hover:opacity-100 transition-all ml-2 text-gray-600">
                &gt;
              </span>
            </Link>
          </li>
          {Object.keys(navButtons).map((key, i) => {
            const val = navButtons[key];
            if (val === "story" || val == "faq") {
              return null;
            }
            return (
              <li
                key={i}
                className="hover:opacity-80 cursor-pointer text-gray-800 relative group hover:bg-gray-100 p-2 border-t"
              >
                <Link
                  href={`/${val}`}
                  className="flex items-center justify-between"
                >
                  <span>{key.replaceAll("_", " ")}</span>
                  <span className="opacity-0 duration-300 group-hover:opacity-100 transition-all ml-2 text-gray-600">
                    &gt;
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ManageNavbar;
