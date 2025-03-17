"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const Slider = ({ videos }: { videos: any }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [debounce, setDebounce] = useState(false);
  const slideVariants = {
    enter: (direction: any) => {
      const a = {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
      console.log(a);
      return a;
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: any) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: any, velocity: any) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: any) => {
    if (!debounce) {
      setDebounce(true);
      const newPage = page + newDirection;
      console.log("a");
      if (newPage >= 0 && newPage < videos.length) {
        setPage([newPage, newDirection]);
      } else if (newPage < 0) {
        setPage([videos.length - 1, -1]);
      } else {
        setPage([0, 1]);
      }
      setTimeout(() => setDebounce(false), 650);
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto md:px-4 pb-16">
      <div className="relative h-[400px] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute h-full md:p-5"
          >
            <div className="bg-white border rounded-lg shadow-lg md:mx-5 p-5 h-full flex flex-row justify-between">
              {/* text */}
              <div className="flex flex-col h-full justify-between flex-1">
                <h2 className="font-[350] text-lg sm:text-2xl w-full text-center">
                  {videos[page].title}
                </h2>
                <p className="text-gray-800 font-lora text-sm sm:text-lg mb-6">
                  {videos[page].text}
                </p>
                <div className="flex items-center">
                  {/* <Image
                    src={testimonials[page].profileImg}
                    alt={"loading"}
                    className="w-12 h-12 bg-gray-200 rounded-full mr-4"
                  /> */}
                  <div>
                    <div className="font-semibold text-gray-800">
                      {videos[page].author}
                    </div>
                    <div className="text-gray-600">{videos[page].address}</div>
                  </div>
                </div>
              </div>

              {/* image */}
              <div className="h-full flex items-center">
                <Image
                  src={videos[page].img}
                  alt="loading"
                  className="w-[125px] h-[125px] md:w-[300px] md:h-[300px] bg-gray-200 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => paginate(-1)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          // disabled={page === 0}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          //disabled={page === testimonials.length - 1}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center gap-2">
        {videos.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => setPage([index, index > page ? 1 : -1])}
            className={`w-2 h-2 rounded-full ${
              page === index ? "bg-orange-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
