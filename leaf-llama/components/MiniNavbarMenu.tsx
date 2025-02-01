"use client";
import { EMAIL, faqNav, navButtons } from "@/lib/constants";
import copy from "copy-to-clipboard";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
const MiniNavbarMenu = ({ hidden, className = "ml-52" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [faqIsOpen, setFAQ] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, [copied]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      {/* Menu Icon */}
      <IoIosMenu
        onClick={toggleMenu}
        className={`h-[85px] w-[45px] cursor-pointer hover:opacity-75 transition-all hover:-translate-y-0.5 ${className}`}
      />
      {/* Dropdown Menu */}
      <div
        className={`overflow-hidden absolute right-0 top-[75px] w-[200px] bg-white rounded-lg shadow-lg border-2 z-[1000] transition-all duration-300 ease-in-out ${
          isMenuOpen && !hidden
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <ul className="">
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
            if (val === "story") {
              return null; // Skip rendering for 'story'
            } else if (val == "faq") {
              return (
                <button
                  onClick={() => setFAQ(!faqIsOpen)}
                  className={` cursor-pointer text-gray-800 relative group hover:bg-gray-100 p-2 border-t inset-0 w-full flex items-center justify-between`}
                  key={i}
                >
                  <span>{key.replaceAll("_", " ")}</span>
                  <span className="opacity-0 duration-300 group-hover:opacity-100 transition-all ml-2 text-gray-600">
                    &gt;
                  </span>
                </button>
              );
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

      <div
        className={`overflow-hidden absolute right-[200px] top-[200px] w-[160px] bg-white rounded-lg shadow-lg border-2 z-[1000] transition-all duration-300 ease-in-out ${
          faqIsOpen && !hidden && isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col">
          {Object.keys(faqNav).map((key, i) => {
            const val: string = faqNav[key];
            return (
              <li
                key={i}
                className="hover:opacity-80 cursor-pointer text-gray-800 relative group hover:bg-gray-100 p-1  border-t"
              >
                {key == "CONTACT" ? (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setCopied(true);
                      copy(EMAIL);
                    }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex flex-col text-xs">
                      <span className="pl-1">{key.replaceAll("_", " ")}</span>
                      {copied ? (
                        <span className="text-xs font-[50px]">
                          Email has been coppied!
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <span className="opacity-0 duration-300 group-hover:opacity-100 transition-all text-xs font-thin ml-2 text-gray-600">
                      {copied ? "✔" : "copy?"}
                    </span>
                  </div>
                ) : (
                  <Link
                    href={`/${val}`}
                    className="flex items-center justify-between hover:opacity-80 cursor-pointer text-xs text-gray-800 relative group hover:bg-gray-100 p-1"
                  >
                    <span className="text-nowrap">
                      {key.replaceAll("_", " ")}
                    </span>
                    <span className="opacity-0 duration-300 group-hover:opacity-100 transition-all ml-2 text-gray-600">
                      &gt;
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default MiniNavbarMenu;
