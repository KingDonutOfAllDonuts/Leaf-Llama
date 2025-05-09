"use client";
import { navButtons } from "@/lib/constants";
import { ArrowUp, Mail, MapPinned, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import icon from "@/app/icon.png";
import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-green-900 flex items-center flex-col text-white py-6 px-5 overflow-x-hidden w-full">
      <div className="w-full flex justify-center absolute -translate-y-full left-0">
        <ArrowUp
          className="text-white w-[50px] h-[50px] rounded-full bg-green-900 cursor-pointer p-3 transition-all hover:-translate-y-0.5"
          onClick={() => {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
          }}
        />
      </div>
      <div className="w-full max-w-6xl px-5 flex flex-row items-center">
        <Image
          src={icon}
          alt=""
          className={`w-12 h-12 object-contain brightness-0 invert-[1]`}
        />
        <div className="flex flex-col">
          <h2 className="text-4xl font-kaushan">Leaf Llama</h2>
          {/* <p className="text-xs">Lettuce eat healthy and fresh!</p> */}
        </div>
      </div>

      <div className="w-full flex flex-row max-w-6xl px-5 justify-between items-center pb-5 border-b">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col space-y-3 flex-1">
            <p className="text-sm mt-2">Lettuce eat healthy and fresh!</p>
            <div className="flex flex-row space-x-2">
              <Mail />
              <p className="text-sm md:text-base font-[300]">
                info@leaf-llama.com
              </p>
            </div>
            <div className="flex flex-row space-x-2">
              <Phone />
              <p className="text-sm md:text-base font-[300]">(555)-555-5555</p>
            </div>
            <div className="flex flex-row space-x-2">
              <MapPinned />
              <p className="text-sm md:text-base font-[300]">Address</p>
            </div>
            <div className="flex flex-row w-full py-3 gap-5">
              <FaInstagram className="w-7 h-7 hover:text-gray-200 cursor-pointer transition-all" />
              <FaFacebook className="w-7 h-7 hover:text-gray-200 cursor-pointer transition-all" />
              <FaYoutube className="w-7 h-7 hover:text-gray-200 cursor-pointer transition-all" />
            </div>
          </div>

          <div className="flex flex-col space-y-3 flex-1">
            <h1 className="text-base md:text-xl font-[450] w-full border-b">
              Pages
            </h1>
            {Object.keys(navButtons).map((v, i) => {
              if (i >= 3) {
                return "";
              }
              let route = navButtons[v];
              return (
                <Link
                  href={"/" + route}
                  key={i}
                  className="text-sm md:text-base font-[300] cursor-pointer hover:underline"
                >
                  {v.replaceAll("_", " ")}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col space-y-3 flex-1 px-3">
            <h1 className="text-xl font-[450] w-full border-b pt-[24px] md:pt-[28px]"></h1>
            {Object.keys(navButtons).map((v, i) => {
              if (i < 3) {
                return "";
              }
              let route = navButtons[v];
              if (route == "faq") {
                route = "references";
              }
              return (
                <Link
                  href={"/" + route}
                  key={i}
                  className="text-sm md:text-base font-[300] cursor-pointer hover:underline"
                >
                  {v.replaceAll("_", " ")}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-sm pt-3">
        &copy; {new Date().getFullYear()} Leaf Llama. All rights reserved. (This
        is a ficticious website.)
      </p>
    </div>
  );
};

export default Footer;
