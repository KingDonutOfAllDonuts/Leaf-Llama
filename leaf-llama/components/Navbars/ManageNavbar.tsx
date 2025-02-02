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
import MiniNavbarMenu from "../MiniNavbarMenu";

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
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const handleProfileClick = () => {
    console.log("Navigating to profile information...");
  };
  1;

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/careers");
  };
  return (
    <nav className="z-[900] flex h-[85px] items-center justify-between px-6 py-2.5 fixed w-full bg-white border-b-2 border-orange-600">
      <h2 className="text-2xl text-gray-800 font-mono tracking-wide mr-5">
        Manage Orders
      </h2>

      <Title top={false} />

      {/* menu Icon */}
      <div className="flex flex-row">
        {/* pr Dropdown */}
        {account ? (
          <Image
            src={getVegetableImage(account.vegetable)}
            alt={""}
            className="h-[50px] mt-[20px] w-[50px] ml-32 no-drag cursor-pointer hover:opacity-75 transition-all hover:-translate-y-0.5 rounded-full aspect-square border border-orange-500"
            onClick={toggleProfileMenu}
          />
        ) : (
          <FaUserCircle
            className="h-[85px] w-[45px] ml-32 cursor-pointer hover:opacity-75 transition-all hover:-translate-y-0.5"
            onClick={toggleProfileMenu}
          />
        )}
        <MiniNavbarMenu hidden={false} className=" ml-2" />
      </div>
      <div
        className={`absolute right-14 top-[80px] w-[200px] bg-white rounded-lg shadow-lg border z-[1000] transition-all duration-300 ease-in-out ${
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
    </nav>
  );
};

export default ManageNavbar;
