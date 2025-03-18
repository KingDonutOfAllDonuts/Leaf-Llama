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
import FadeIn, { FadeInUp } from "@/components/FadeInUp";
import sliver from "@/public/MenuSliver.jpg";
const Menu = () => {
  const [catagory, setCatagory] = useState("all");
  return (
    <div className="relative flex flex-col items-center bg-gray-100 min-h-screen overflow-x-hidden">
      <Navbar />

      <h1 className="w-full text-center text-5xl mt-20 p-16 font-kaushan bg-white relative">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute z-10 h-full w-full" />
          <Image
            className="w-full h-full object-cover"
            src={sliver}
            alt="Decorative background"
          />
        </div>
        <span className="relative text-gray-100 z-10">
          <span className="inline-block group">
            {[
              "U",
              "n",
              "b",
              "e",
              "-",
              "l",
              "e",
              "a",
              "f",
              "-",
              "a",
              "b",
              "l",
              "y",
            ].map((letter, index) => (
              <span
                key={index}
                className={`inline-block hover:text-green-300 transition-all duration-300 ${
                  index >= 5 && index <= 8
                    ? "text-green-600 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)] animate-leaf"
                    : ""
                }`}
                style={{
                  animationDelay: `${(index - 5) * 100}ms`,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                {letter}
              </span>
            ))}
          </span>
          <br className="md:hidden" /> good for you...
        </span>
      </h1>

      <div className="flex flex-row space-x-4 m-5 flex-wrap justify-center">
        {foodCatagories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCatagory(cat)}
            className="group relative mb-3 transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            {/* Main button content */}
            <div
              className={`
          relative z-10 px-6 py-2 text-sm font-medium
          rounded-full transition-colors duration-300
          ${
            catagory === cat
              ? "bg-orange-500 text-white"
              : "bg-green-500/90 text-white hover:bg-green-500/80"
          }
        `}
            >
              {cat.toUpperCase()}
            </div>

            {/* Animated background ring - now working */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-green-900/20 rounded-full 
                 scale-95 transition-all duration-300
                 group-hover:100 group-hover:bg-green-900/30"
            />
          </button>
        ))}
      </div>
      <Link href={"/order"} className="m-3 relative rounded-full">
        <button className="btn flash-slide hover:scale-105 transition-transform duration-500 flash-slide--green rounded-full">
          Order Online
        </button>
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
    <div className="w-full group/food-category">
      {" "}
      {/* Scoped group name */}
      <FoodTitle title={title.toUpperCase()} />
      <div className="grid grid-cols-2 gap-4 w-full p-5 mb-10">
        {list.map((food, i) => (
          <FoodItem key={i} i={i} food={food} />
        ))}
      </div>
    </div>
  );
};

const FoodTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full group-hover/food-category:px-20 transition-all duration-1000 md:px-28 pb-1">
      <FadeInUp>
        <h1
          className="text-center text-5xl font-kaushan p-2 w-full 
          transition-all duration-1000 group-hover/food-category:-translate-y-0.5 group-hover/food-category:tracking-wider"
        >
          {title.charAt(0) + title.slice(1).toLowerCase()}
        </h1>
      </FadeInUp>
    </div>
  );
};

const FoodItem = ({ food, i }) => {
  return (
    <FadeIn variant={i % 2 == 0 ? "left" : "right"}>
      <div className="w-full rounded-lg hover:shadow-lg group transition-all hover:-translate-y-1.5  duration-500 flex max-sm:flex-col max-sm:items-center max-sm:pt-2 flex-row shadow-sm bg-white border-gray-200 overflow-hidden">
        <Image
          src={food.img}
          alt=""
          className="h-44 w-44 rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="p-2">
          <h3 className="text-base md:text-xl lg:text-2xl group-hover:-translate-y-1 transition-transform duration-500 text-green-800">
            {food.name}
          </h3>
          <p className="text-xs md:text-sm lg:text-base text-gray-500 group-hover:-translate-y-0.5 transition-transform duration-500">
            {food.desc}
          </p>
        </div>
      </div>
    </FadeIn>
  );
};

export default Menu;
