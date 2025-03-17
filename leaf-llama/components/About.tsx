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
    <section className="bg-green-700 ">
      <div className="container mx-auto">
        {/* FARM TO TABLE */}
        <AboutItem
          title={"Organic Farm-to-Table"}
          text={
            "We pride ourselves on sourcing ingredients directly from local farms to ensure every dish is as fresh and awesome as possible. By connecting with local farmers, we support the community while bringing you food that is good for you and the environment."
          }
          items={farmToTableCards}
          index={0}
        />

        <AboutItem
          title={"Ethical Preparation Processes"}
          text="Our chefs take great care in preparing every meal with love and
              attention to detail. From using zero-waste methods to crafting
              dishes by hand, we ensure that every bite is both ethical and
              delicious."
          items={preperationCards}
          index={1}
        />

        <AboutItem
          title={"Commitment to Sustainability"}
          text="Sustainability is at the heart of everything we do. From using
              biodegradable packaging to energy-efficient practices, we’re
              dedicated to protecting the planet while serving wholesome,
              plant-based food."
          items={farmToTableCards}
          index={2}
        />

        {/* Sustainability */}
      </div>
    </section>
  );
};

const AboutItem = ({ title, text, items, index }) => {
  return (
    <div
      className={`flex ${index % 2 == 0 ? "flex-row" : "flex-row-reverse"} items-center h-[400px]`}
    >
      <div className="w-full lg:w-1/2 px-10">
        <h2 className="text-4xl text-green-100 mb-4">{title}</h2>
        <p className="text-sm font-lora xl:text-lg text-gray-200">{text}</p>
      </div>
      {/* stack */}
      <div className="flex-1 bg-red-200 h-full">
        <VideoSlider items={items} />
      </div>
    </div>
  );
};

export default AboutSection;
