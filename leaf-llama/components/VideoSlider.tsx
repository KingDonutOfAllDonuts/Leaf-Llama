"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaCircle } from "react-icons/fa";

type Slide = {
  id: number;
  name: string;
  videoSrc: string;
};

export const VideoSlider = ({ items }: { items: Slide[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const sliderRef = useRef();
  const [isInView, setIsInView] = useState(false);
  const [debounce, setDebounce] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const currentVideo = videoRefs.current[currentSlide];
    if (!currentVideo) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        currentVideo.pause();
      } else if (isInView) {
        currentVideo.play().catch(() => {});
      }
    };

    // Handle tab visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Handle intersection observer changes
    if (isInView) {
      currentVideo.play().catch(() => {});
    } else {
      currentVideo.pause();
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      currentVideo.pause();
    };
  }, [isInView, currentSlide]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRefs.current[currentSlide];
    const updateProgress = () => {
      if (video) {
        const progressPercentage = (video.currentTime / video.duration) * 100;
        setProgress(progressPercentage || 0);
      }
    };

    const intervalId = setInterval(updateProgress, 15);

    return () => clearInterval(intervalId);
  }, [isInView, currentSlide]);

  const handleNext = () => {
    if (debounce) {
      return;
    }
    setDebounce(true);
    setDirection("right");
    setCurrentSlide((prev) => (prev + 1) % items.length);
    setTimeout(() => setDebounce(false), 500);
  };

  const handlePrev = () => {
    if (debounce) {
      return;
    }
    setDebounce(true);
    setDirection("left");
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
    setTimeout(() => setDebounce(false), 500);
  };

  useEffect(() => {
    const video = videoRefs.current[currentSlide];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [currentSlide]);

  const handleVideoEnd = () => {
    handleNext();
  };

  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: (direction: string) => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    }),
  };

  return (
    <div className="relative w-full h-full overflow-hidden" ref={sliderRef}>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <video
            ref={(el) => {
              if (el) {
                videoRefs.current = [];
                videoRefs.current[currentSlide] = el;
              }
            }}
            src={items[currentSlide].videoSrc}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <motion.button
          onClick={handlePrev}
          className="p-4 text-white/80 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className="w-8 h-8 drop-shadow-xl" />
        </motion.button>
        <motion.button
          onClick={handleNext}
          className="p-4 text-white/80 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowRight className="w-8 h-8 drop-shadow-xl" />
        </motion.button>
      </div>

      {/* Slide  Dots */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex w-[85px] justify-between gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {items.map((_, index) => (
          <div
            key={index}
            className={` relative overflow-hidden text-sm cursor-pointer transition-all duration-1000 hover:text-green-500 ${
              index === currentSlide ? "text-green-400/40" : "text-green-400/30"
            }`}
            style={{ width: index === currentSlide ? "50px" : "14px" }}
            onClick={() => {
              setDirection(index > currentSlide ? "right" : "left");
              setCurrentSlide(index);
            }}
          >
            {index === currentSlide && (
              <span
                className="block absolute rounded-full h-3.5 bg-green-300 z-50"
                style={{ width: `${progress}%` }}
              ></span>
            )}
            <span className="block  w-full h-3.5 rounded-full bg-current"></span>
          </div>
        ))}
      </motion.div>

      {/* Slide Title */}
      <motion.div
        className="absolute w-full bottom-9 text-white text-2xl font-medium text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {items[currentSlide].name}
      </motion.div>
    </div>
  );
};
