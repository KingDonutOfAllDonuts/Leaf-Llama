"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FadeInUp } from "./FadeInUp";

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
      className="w-full bg-green-100 md:px-20 overflow-hidden"
      ref={containerRef}
    >
      <div className="w-full flex justify-center items-center">
        <div className="max-w-7xl mx-auto py-5 px-4 md:px-8 lg:px-10">
          <FadeInUp>
            <h2 className="text-3xl w-full text-center md:text-7xl mb-8 mt-5 font-kaushan text-black max-w-4xl">
              Our Story
            </h2>
          </FadeInUp>
          <FadeInUp>
            <p className="text-neutral-700 text-base md:text-xl max-w-4xl">
              The journey of Leaf Llama began with a simple idea: to create a
              space where people could embrace a healthy, plant-based lifestyle
              while celebrating the joy of delicious food. From our humble
              beginnings as a small, local eatery, we have grown into a vibrant
              community-driven restaurant that is committed to sustainability,
              innovation, and taste.
            </p>
          </FadeInUp>
        </div>
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
        const cardCenter = rect.top + rect.height / 2;
        const triggerZone = windowHeight * 0.4;

        setIsInMiddle(cardCenter < windowHeight - triggerZone);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div key={index} className="flex justify-start pt-10 md:pt-40">
      <div className="flex flex-col justify-center items-center max-w-20 w-full relative z-50">
        <div className="absolute top-1/2 -translate-y-[calc(50%+100px)] h-10 left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
          <div
            ref={cardRef}
            className={`
              h-4 w-4 rounded-full border-2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${
                isInMiddle
                  ? "bg-green-500 border-green-600 scale-150 shadow-lg"
                  : "bg-green-100 border-green-300 scale-100"
              }
            `}
          />
        </div>
      </div>

      <div
        className={`
          relative w-full bg-white shadow-lg rounded-lg p-6
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${
            isInMiddle
              ? "opacity-100 translate-y-0 scale-100 shadow-xl"
              : "opacity-40 translate-y-10 scale-95 rotate-[1deg]"
          }
        `}
      >
        <h3 className="text-2xl font-bold text-green-800 mb-4 transform transition-all duration-300 delay-150">
          {item.title}
        </h3>
        <div
          className={`transition-opacity duration-500 ${isInMiddle ? "opacity-100" : "opacity-40"}`}
        >
          {item.content}
        </div>
      </div>
    </div>
  );
};
