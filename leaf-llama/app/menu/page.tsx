"use client";
import Navbar from "@/components/Navbars/Navbar";
import React, { useState } from "react";
import "@/app/globals.css";
import {
  foodCatagories,
  others,
  salads,
  sides,
  smoothies,
} from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import FadeInUp from "@/components/FadeInUp";

const Menu = () => {
  const [catagory, setCatagory] = useState("all");
  return (
    <div className="relative flex flex-col items-center bg-gray-100 min-h-screen">
      <Navbar />

      <h1 className="w-full text-center text-5xl mt-20 p-10 font-kaushan bg-white border-b-4 border-orange-500">
        Menu
      </h1>

      <div className="flex flex-row space-x-4 m-5 flex-wrap justify-center">
        {foodCatagories.map((cat) => {
          return (
            <button
              className="p-[3px] relative mb-2"
              key={cat}
              onClick={() => setCatagory(cat)}
            >
              <div className="absolute inset-0 bg-green-900 rounded-full" />
              <div
                className={`px-8 py-2 ${catagory === cat ? "bg-orange-500" : "bg-green-500 hover:bg-transparent"} rounded-full  relative group transition duration-200 text-white`}
              >
                {cat.toUpperCase()}
              </div>
            </button>
          );
        })}
      </div>
      <Link href={"/order"} className="m-5 relative">
        <div className="absolute inset-0 bg-green-500 rounded-full border-2 border-black" />
        <div className="px-8 py-2  bg-green-900 rounded-full  relative group transition duration-200 text-white hover:bg-transparent">
          ORDER NOW
        </div>
      </Link>

      {/* menu */}
      {catagory == "all" || catagory == "salads" ? (
        <FoodCatagory title="SALADS" list={salads} />
      ) : (
        ""
      )}

      {catagory == "all" || catagory == "smoothies" ? (
        <FoodCatagory title="SMOOTHIES" list={smoothies} />
      ) : (
        ""
      )}

      {catagory == "all" || catagory == "sides" ? (
        <FoodCatagory title="SIDES" list={sides} />
      ) : (
        ""
      )}
      {catagory == "all" || catagory == "others" ? (
        <FoodCatagory title="OTHERS" list={others} />
      ) : (
        ""
      )}
    </div>
  );
};

const FoodCatagory = ({ title, list }: { title: string; list: any[] }) => {
  return (
    <div className="w-screen">
      <FoodTitle title={title.toUpperCase()} />
      <div className="grid grid-cols-2 gap-4 w-full p-5 mb-10">
        {list.map((food, i) => (
          <FoodItem key={i} food={food} />
        ))}
      </div>
    </div>
  );
};

const FoodTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full px-28 pb-5">
      <h1 className="text-center text-5xl font-kaushan p-2 w-full border-b-4 border-orange-500">
        {title}
      </h1>
    </div>
  );
};

const FoodItem = ({ food }: { food: any }) => {
  return (
    <FadeInUp>
      <div className="w-full rounded-lg hover:border-gray-300 transition-all flex max-sm:flex-col max-sm:items-center max-sm:pt-2 flex-row border-4 bg-white border-gray-200 overflow-hidden">
        <Image
          src={food.img}
          alt=""
          className="h-44 w-44 rounded-lg object-cover"
        />

        <div className="p-2">
          <h3 className="font-kaushan text-base md:text-xl text-green-800">
            {food.name}
          </h3>
          <p className="text-xs md:text-sm text-gray-500">{food.desc}</p>
        </div>
      </div>
    </FadeInUp>
  );
};

export default Menu;
