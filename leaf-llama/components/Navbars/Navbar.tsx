"use client";
import React, { useEffect, useRef, useState } from "react";
import icon from "@/app/icon.png";
import Image from "next/image";
import Title from "../Title";
import { EMAIL, faqNav, navButtons } from "@/lib/constants";
import Link from "next/link";
import leaf from "@/public/leaf.png";
import copy from "copy-to-clipboard";
import MiniNavbarMenu from "../MiniNavbarMenu";

const Navbar = ({ top = false }) => {
  const [faqIsOpen, setFAQ] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, [copied]);

  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        if (currentScrollY > 100) {
          // Adjust this threshold as needed
          setShowNavbar(false);
        }
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      // Always show navbar at top of page
      if (currentScrollY === 0) {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`z-[1000] flex h-[85px] justify-between px-6 py-2.5 fixed w-full transition-transform duration-300 ease-in-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${
        top
          ? "flex-col items-center bg-transparent border-b-0"
          : "bg-white border-b-2 border-orange-600"
      }`}
    >
      <div className="flex flex-[.5] flex-row items-center">
        <Image
          src={icon}
          alt=""
          className={`${top ? "max-sm:w-16 max-sm:h-20 w-20 h-24" : "w-14 h-16"} object-contain no-drag`}
        />
        <Title top={top} />
      </div>
      <div
        className={`${!top ? "lg:hidden" : "hidden"} flex items-center -ml-28`}
      >
        <MiniNavbarMenu hidden={!showNavbar} />
      </div>
      <div
        className={`flex flex-row flex-1 justify-between items-center ${!top ? "max-lg:hidden" : ""}`}
      >
        {Object.keys(navButtons).map((key, i) => {
          const val: string = navButtons[key];
          if (val == "story") {
            return (
              <Link
                href={`/#story`}
                className="max-sm:hidden md:text-base lg:text-lg text-nowrap transform transition duration-200  hover:text-gray-100 hover:-translate-y-1 font-semibold font-kaushan text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                key={i}
              >
                <Image
                  src={leaf}
                  alt=""
                  className="absolute rotate-45 -top-6 max-md:w-[86px] max-md:h-[86px] w-24 h-24 -z-50 "
                />
                {key.replaceAll("_", " ")}
              </Link>
            );
          } else if (val == "faq") {
            return (
              <button
                onClick={() => setFAQ(!faqIsOpen)}
                className={`${top ? "text-white hover:text-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" : "hover:text-gray-700"} text-sm md:text-base lg:text-lg text-nowrap font-semibold transform hover:-translate-y-1 max-sm:p-2 p-5 transition duration-200`}
                key={i}
              >
                {key.replaceAll("_", " ")}
                <div
                  className={`overflow-hidden absolute top-[50px] right-[25px] w-[160px] bg-white rounded-lg shadow-lg border-2 z-[1000] transition-all duration-300 ease-in-out ${
                    faqIsOpen
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
                                <span className="pl-1">
                                  {key.replaceAll("_", " ")}
                                </span>
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
              </button>
            );
          }
          return (
            <Link
              href={`/${val}`}
              className={`${top ? "text-white hover:text-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" : "hover:text-gray-700"} text-xs md:text-base lg:text-lg text-nowrap font-semibold transform hover:-translate-y-1 p-5 transition duration-200`}
              key={i}
            >
              {key.replaceAll("_", " ")}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
