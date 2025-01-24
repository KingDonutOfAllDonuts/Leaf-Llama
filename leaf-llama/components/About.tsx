import React from "react";
import { VideoSlider } from "./VideoSlider";

const farmToTableCards = [
  {
    id: 1,
    name: "The Farm",
    videoSrc: "/Farm.mp4", // Path to video
  },
  {
    id: 2,
    name: "On The Road",
    videoSrc: "/TruckRoad.mp4",
  },
  {
    id: 3,
    name: "Planting",
    videoSrc: "/Planting.mp4",
  },
];

const preperationCards = [
  {
    id: 1,
    name: "Washing",
    videoSrc: "/Wash.mp4", // Path to video
  },
  {
    id: 2,
    name: "Mixing",
    videoSrc: "/Mixing.mp4",
  },
  {
    id: 3,
    name: "Salad",
    videoSrc: "/Making.mp4",
  },
];

const sustainabilityCards = [
  {
    id: 1,
    name: "Researcher",
    videoSrc: "/Researching.mp4", // Path to video
  },
  {
    id: 2,
    name: "Globe",
    videoSrc: "/Spinning.mp4",
  },
  {
    id: 3,
    name: "Trees",
    videoSrc: "/Trees.mp4",
  },
];

const AboutSection = () => {
  return (
    <section className="bg-green-800 py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 space-y-20 m-5">
        {/* FARM TO TABLE */}
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-1/2 px-6">
            <h2 className="text-3xl font-bold text-green-100 mb-4">
              Organic Farm-to-Table
            </h2>
            <p className="text-sm xl:text-lg text-gray-200">
              We pride ourselves on sourcing ingredients directly from local
              farms to ensure every dish is as fresh and awesome as possible. By
              connecting with local farmers, we support the community while
              bringing you food that is good for you and the environment.
            </p>
          </div>
          {/* stack */}
          <div className="flex-1">
            <VideoSlider items={farmToTableCards} />
          </div>
        </div>

        {/* Preperation */}
        <div className="flex flex-wrap items-center flex-row-reverse">
          <div className="w-full lg:w-1/2 px-6">
            <h2 className="text-3xl font-bold text-green-100 mb-4">
              Ethical Preparation Processes
            </h2>
            <p className="text-lg text-gray-200">
              Our chefs take great care in preparing every meal with love and
              attention to detail. From using zero-waste methods to crafting
              dishes by hand, we ensure that every bite is both ethical and
              delicious.
            </p>
          </div>
          {/* stack */}
          <div className="flex-1">
            <VideoSlider items={preperationCards} />
          </div>
        </div>

        {/* Sustainability */}
        <div className="flex flex-wrap items-center rounded">
          <div className="w-full lg:w-1/2 px-6">
            <h2 className="text-3xl font-bold text-green-100 mb-4">
              Commitment to Sustainability
            </h2>
            <p className="text-lg text-gray-200">
              Sustainability is at the heart of everything we do. From using
              biodegradable packaging to energy-efficient practices, we’re
              dedicated to protecting the planet while serving wholesome,
              plant-based food.
            </p>
          </div>
          {/* stack */}
          <div className="flex-1">
            <VideoSlider items={sustainabilityCards} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
