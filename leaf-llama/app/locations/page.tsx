"use client";
import Map from "@/components/Map";
import Navbar from "@/components/Navbars/Navbar";
import React, { useState } from "react";

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

const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleViewOnMap = (location) => {
    setSelectedLocation(location.position);
  };

  return (
    <div className="w-full relative flex flex-col">
      <Navbar />
      <div className="mt-[85px] flex justify-center flex-col">
        <h1 className="w-full text-center text-5xl p-10 font-kaushan bg-white border-b-4 border-orange-500">
          Locations
        </h1>
        <div className="flex flex-row h-[calc(100vh-85px)] ">
          {/* side bar of locaations */}
          <div className="w-[120px] sm:w-[200px] md:w-[300px] h-full overflow-y-scroll overflow-x-hidden flex flex-col">
            {locations.map((location) => (
              <div
                key={location.id}
                className="border-b border-orange-300 p-0.5 sm:p-4 py-7 mb-4"
              >
                <h3 className="text-green-700 font-bold uppercase text-base sm:text-xl mb-2">
                  {location.name}
                </h3>
                <p className=" text-blue-600 text-xs sm:text-sm">
                  (555) 555-5555
                </p>
                <p className="text-xs">Open 24/7</p>
                <div className="flex flex-col gap-2 mt-4">
                  <button
                    className="bg-green-500 hover:bg-green-400 text-white py-2 rounded text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    onClick={() => handleViewOnMap(location)}
                  >
                    VIEW ON MAP
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* map */}
          <div className="flex-1 h-full p-2 sm:p-10 border bg-slate-100 border-orange-500">
            <Map locations={locations} selectedLocation={selectedLocation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
