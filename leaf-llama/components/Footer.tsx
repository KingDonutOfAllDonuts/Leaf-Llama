import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-6 px-5">
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-kaushan">Leaf Llama</h2>
          <p className="text-sm">Lettuce eat healthy and fresh!</p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 mr-12">
          <Link href={"/menu"} className="z-10 hover:text-gray-300 transition">
            Menu
          </Link>
          <Link
            href={"/locations"}
            className="z-10 hover:text-gray-300 transition"
          >
            Locations
          </Link>
          <Link href={"/order"} className="z-10 hover:text-gray-300 transition">
            Order
          </Link>
        </div>
        <a
          href="https://github.com/KingDonutOfAllDonuts/Leaf-Llama"
          className="flex items-center shadow-[0_0_0_1px_#000000_inset] px-4 py-2 space-x-2 text-white rounded-lg transform hover:-translate-y-0.5 transition duration-400"
        >
          <FaGithub size={20} />
          <span className="text-sm">Github repo</span>
        </a>
      </div>

      {/* not real */}
      <div className="mt-6 text-center text-xs">
        <p>
          &copy; {new Date().getFullYear()} Leaf Llama. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
