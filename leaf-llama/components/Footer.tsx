"use client";
import { navButtons } from "@/lib/constants";
import { ArrowUp, Mail, MapPinned, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-green-900 text-white py-6 px-5 overflow-x-hidden w-full">
      <div className="w-full flex justify-center absolute -translate-y-full left-0">
        <ArrowUp
          className="text-white w-[50px] h-[50px] rounded-full bg-green-900 cursor-pointer p-3 transition-all hover:-translate-y-0.5"
          onClick={() => {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
          }}
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="max-w-3xl border-b px-2 py-2 flex flex-row justify-between w-full">
          <div className="flex flex-col">
            <h2 className="text-3xl font-kaushan">Leaf Llama</h2>
            <p className="text-xs">Lettuce eat healthy and fresh!</p>
          </div>
          {/* <a
            href="https://github.com/KingDonutOfAllDonuts/Leaf-Llama"
            className="flex items-center shadow-[0_0_0_2px_#000000_inset] px-4 space-x-2 text-white rounded-lg transform hover:-translate-y-0.5 transition duration-400"
          >
            <FaGithub size={20} />
            <span className="text-sm">Github repo</span>
          </a> */}
        </div>

        <div className="max-w-3xl px-2 py-2 flex flex-row justify-between w-full">
          <div className="flex flex-col space-y-3 flex-1 px-3">
            <h1 className="text-base md:text-xl font-[450] w-full border-b-2">
              Leaf Llama
            </h1>
            <div className="flex flex-row space-x-2">
              <Mail />
              <p className="text-sm md:text-base font-[300] font-lora">
                info@leaf-llama.com
              </p>
            </div>
            <div className="flex flex-row space-x-2">
              <Phone />
              <p className="text-sm md:text-base font-[300] font-lora">
                (555)-555-5555
              </p>
            </div>
            <div className="flex flex-row space-x-2">
              <MapPinned />
              <p className="text-sm md:text-base font-[300] font-lora">
                Address
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-3 flex-1 px-3">
            <h1 className="text-base md:text-xl font-[450] w-full border-b-2">
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
                  className="text-sm md:text-base font-[300] font-lora cursor-pointer hover:underline"
                >
                  {v.replaceAll("_", " ")}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col space-y-3 flex-1 px-3">
            <h1 className="text-xl font-[450] w-full border-b-2 pt-[24px] md:pt-[28px]"></h1>
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
                  className="text-sm md:text-base font-[300] font-lora cursor-pointer hover:underline"
                >
                  {v.replaceAll("_", " ")}
                </Link>
              );
            })}
          </div>
        </div>
        <p className="text-sm pt-3">
          &copy; {new Date().getFullYear()} Leaf Llama. All rights reserved.
          (This is a ficticious website.)
        </p>
      </div>
    </div>
  );
};

export default Footer;
