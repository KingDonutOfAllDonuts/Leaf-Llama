"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  return (
    <div
      className="w-full bg-green-100 font-sans md:px-20 overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-5 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-5xl mb-8 mt-5 font-kaushan text-black max-w-4xl">
          Our Story
        </h2>
        <p className="text-neutral-700 text-sm md:text-base max-w-xl">
          The journey of Leaf Llama began with a simple idea: to create a space
          where people could embrace a healthy, plant-based lifestyle while
          celebrating the joy of delicious food. From our humble beginnings as a
          small, local eatery, we have grown into a vibrant community-driven
          restaurant that is committed to sustainability, innovation, and taste.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <TimelineItem key={index} index={index} item={item} />
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-orange-500 via-red-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ index, item }) => {
  const cardRef = useRef(null);
  const [isInMiddle, setIsInMiddle] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate the card's center and viewport center
        const cardCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        console.log(cardCenter, viewportCenter);
        // Check if the card's center is close to the viewport's center
        if (cardCenter - viewportCenter < 100) {
          setIsInMiddle(true);
        } else {
          setIsInMiddle(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div key={index} className="flex justify-start pt-10 md:pt-40">
      <div className="flex flex-col justify-center items-center max-w-20 w-full relative z-50">
        <div className="absolute top-1/2 -translate-y-[calc(50%+100px)] h-10 left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
          <div
            ref={cardRef}
            className="h-4 w-4 rounded-full bg-green-200 border border-green-300 p-2"
          />
        </div>
      </div>

      <div
        className={`relative w-full duration-300 bg-white shadow-md rounded-lg transition-all ${isInMiddle ? "opacity-100 -translate-y-2" : "opacity-50"} p-6`}
      >
        <h3 className="text-2xl font-bold text-green-800 mb-4">{item.title}</h3>
        {item.content}
      </div>
    </div>
  );
};
