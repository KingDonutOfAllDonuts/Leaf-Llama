"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

type Slide = {
  id: number;
  name: string;
  videoSrc: string;
};

export const VideoSlider = ({ items }: { items: Slide[] }) => {
  const SLIDE_OFFSET = 10;
  const [slides, setSlides] = useState<Slide[]>(items);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const cardStackRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleVideoEnd = () => {
    setSlides((prevCards: Slide[]) => {
      const newArray = [...prevCards];
      newArray.unshift(newArray.pop()!);
      return newArray;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (cardStackRef.current) {
      observer.observe(cardStackRef.current);
    }

    return () => {
      if (cardStackRef.current) {
        observer.unobserve(cardStackRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (videoElementRef.current && isInView) {
      videoElementRef.current.play();
    } else if (videoElementRef.current) {
      videoElementRef.current.pause();
    }
  }, [slides, isInView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (cardStackRef.current) {
      observer.observe(cardStackRef.current);
    }

    return () => {
      if (cardStackRef.current) {
        observer.unobserve(cardStackRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoElementRef.current;
    const updateProgress = () => {
      if (video) {
        const progressPercentage = (video.currentTime / video.duration) * 100;
        setProgress(progressPercentage || 0);
      }
    };

    const intervalId = setInterval(updateProgress, 30);

    return () => clearInterval(intervalId);
  }, [slides]);

  return (
    <div className="flex flex-row">
      <div
        className="relative h-[215px] w-[300px] lg:h-[265px] lg:w-[350px] xl:h-[325px] xl:w-[500px] overflow-hidden rounded-3xl rounded-r-none"
        ref={cardStackRef}
      >
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute bg-green-300 w-full h-full rounded-3xl p-3 shadow-inner border-2 border-r-0 border-gray-700/55 flex flex-col justify-between rounded-r-none"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              //animate to
              right: index * -SLIDE_OFFSET * 20,

              zIndex: slides.length - index,
            }}
          >
            <div className="font-normal text-gray-800">
              {/* top video gets onEnded */}
              {index === 0 ? (
                <video
                  src={slide.videoSrc}
                  ref={videoElementRef}
                  autoPlay
                  muted
                  playsInline
                  className="h-full w-full rounded-3xl card-video-top"
                  onEnded={handleVideoEnd}
                />
              ) : (
                <video
                  src={slide.videoSrc}
                  muted
                  playsInline
                  className="h-full w-full rounded-lg"
                />
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <p className="text-gray-800 font-medium mt-2">{slide.name}</p>
                <a
                  href="https://www.freepik.com/"
                  className="text-xs text-blue-500 w-full text-right -mt-1"
                >
                  Freepik
                </a>
              </div>

              <div className="flex-1 mx-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-gray-700 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        className="flex justify-center items-center bg-green-500 border-2 w-[50px] border-gray-700/55 border-l-0 p-1 hover:cursor-pointer z-50 hover:bg-green-500/70  ease-out transition-all duration-75 hover:w-[60px] hover:justify-end hover:text-black"
        onClick={handleVideoEnd}
      >
        <FaArrowRight className="h-[50px] w-[50px] text-gray-600" />
      </button>
    </div>
  );
};
