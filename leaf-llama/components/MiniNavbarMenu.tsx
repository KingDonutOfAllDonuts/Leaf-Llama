"use client";
import { EMAIL, faqNav, navButtons } from "@/lib/constants";
import copy from "copy-to-clipboard";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
const MiniNavbarMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [faqIsOpen, setFAQ] = useState(false);
  const [copied, setCopied] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      {/* Menu Icon */}
      <IoIosMenu
        onClick={toggleMenu}
        className="h-[85px] w-[45px] ml-52 cursor-pointer hover:opacity-75 transition-all hover:-translate-y-0.5"
      />
      {/* Dropdown Menu */}
      <div
        className={`fixed top-[60px] right-[25px] w-[300px] bg-white shadow-2xl border z-[1000] transition-all duration-500 ease-in-out ${
          isMenuOpen
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
              console.log("faq");
              return (
                <button
                  onClick={() => setFAQ(!faqIsOpen)}
                  className={` cursor-pointer text-gray-800 relative group hover:bg-gray-100 p-2 border-t inset-0 w-full text-left`}
                  key={i}
                >
                  {key.replaceAll("_", " ")}
                  <div
                    className={`fixed top-[160px] right-[300px] w-[300px] bg-white shadow-2xl border z-[1000] transition-all duration-500 ease-in-out rounded-xl ${
                      faqIsOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-5 pointer-events-none"
                    }
                  `}
                  >
                    <ul className="p-4 space-y-4">
                      {Object.keys(faqNav).map((key, i) => {
                        const val: string = faqNav[key];
                        return (
                          <li
                            key={i}
                            className="hover:opacity-80 cursor-pointer text-gray-800 relative group"
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
                                <div className="flex flex-col">
                                  <span>{key.replaceAll("_", " ")}</span>
                                  {copied ? (
                                    <span className="absolute mt-5 text-xs font-thin">
                                      Email has been coppied!
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <span className="opacity-0 duration-300 group-hover:opacity-100 transition-all ml-2 text-gray-600">
                                  {copied ? "✔" : ">"}
                                </span>
                              </div>
                            ) : (
                              <Link
                                href={`/${val}`}
                                className="flex items-center justify-between"
                              >
                                <span>{key.replaceAll("_", " ")}</span>
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
    </>
  );
};

export default MiniNavbarMenu;
