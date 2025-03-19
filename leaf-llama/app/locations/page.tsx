"use client";
import Map from "@/components/Map";
import Navbar from "@/components/Navbars/Navbar";
import { navbarAtom } from "@/lib/store";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FadeInLeft, FadeInRight } from "@/components/FadeInUp";
import { Clock, Phone } from "lucide-react";
import Image from "next/image";
const locations = [
  {
    id: 1,
    name: "Erbil",
    position: [36.1916110682762, 44.01032640175012],
  },
  {
    id: 2,
    name: "Nashville",
    position: [36.2124863682578, -86.69440159490702],
  },
  {
    id: 3,
    name: "Mckinney",
    position: [33.18908688197557, -96.6312560098288],
  },
  {
    id: 4,
    name: "Srednekolymsk",
    position: [67.43740511999006, 153.73056224130494],
  },
  {
    id: 5,
    name: "Kirtland AFB",
    position: [35.054413722622485, -106.55019848056676],
  },
  {
    id: 6,
    name: "Statue of Liberty",
    position: [40.689187786729875, -74.04450348450182],
  },
  {
    id: 7,
    name: "Antartica",
    position: [-68.70520011530638, 77.9814883135157],
  },
  {
    id: 8,
    name: "White House",
    position: [38.897627438288964, -77.03650897203966],
  },
];
import sliver from "@/public/LocationSliver.jpg";
const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleViewOnMap = (location) => {
    setSelectedLocation(location.position);
  };

  const showNavbar = useAtomValue(navbarAtom);

  return (
    <div className="w-full relative flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex justify-center flex-col">
        <h1 className="w-full text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-20 p-10 lg:p-16 font-kaushan bg-white relative">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute z-10 h-full w-full bg-gray-500/10" />
            <Image className="w-full h-full object-cover" src={sliver} alt="" />
          </div>
          <span className="relative text-gray-100 z-10 whitespace-nowrap">
            <span className="inline-block group">
              {["R", "o", "o", "t", "i", "n", "g"].map((letter, index) => (
                <span
                  key={index}
                  className={`inline-block hover:text-amber-600 transition-all
          text-amber-500 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)] 
          animate-digging origin-bottom
          ${index >= 4 ? "delay-[400ms]" : `delay-[${index * 75}ms]`}`}
                  style={{
                    animationDelay: `${index < 4 ? index * 75 : 400}ms`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>{" "}
            for you to come visit.
          </span>
        </h1>
        <div className="w-full flex flex-row space-x-5 my-10">
          <div className="flex flex-col space-y-3">
            {locations.map((location, i) => (
              <FadeInLeft key={i}>
                <div
                  key={location.id}
                  className={`group relative bg-white rounded-lg p-4 sm:p-6 transition-all duration-300 hover:scale-[1.02] active:scale-[.98] ${
                    selectedLocation?.join() === location.position.join()
                      ? "ring-2 ring-orange-500"
                      : "shadow-md hover:shadow-lg"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-green-700 font-bold text-lg md:text-xl mb-1">
                      {location.name}
                    </h3>
                    <div className="flex items-center gap-2 text-blue-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm md:text-base">
                        (555) 555-5555
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Open 24/7</span>
                    </div>
                    <button
                      onClick={() => handleViewOnMap(location)}
                      className="mt-4 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                    >
                      VIEW ON MAP
                    </button>
                  </div>
                </div>
              </FadeInLeft>
            ))}
          </div>
          <div
            className={`flex-1 h-[600px] md:h-[600px] lg:h-[80vh] sticky top-[100px] transition-all duration-300 ${
              showNavbar ? "lg:top-[100px]" : "lg:top-[75px]"
            }`}
          >
            <FadeInRight full={true}>
              <div
                // initial={{ opacity: 0, x: 20 }}
                // animate={{ opacity: 1, x: 0 }}
                className={`rounded-xl h-full w-full border border-orange-300 bg-white transition-all duration-1000 shadow-md hover:shadow-xl overflow-hidden `}
              >
                <Map
                  locations={locations}
                  selectedLocation={selectedLocation}
                />
              </div>
            </FadeInRight>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
