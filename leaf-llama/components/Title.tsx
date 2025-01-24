"use client";
import leaf from "@/public/leaf.png";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

const Title = ({ top = false }) => {
  const h1Ref = useRef(null);
  const animation = useAnimation();
  const router = useRouter();

  const handleMouseMove = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    animation.stop();
    animation.start({
      backgroundImage: `radial-gradient(circle at ${x}% ${y}%, #a1eb41, #58831b)`,
      transition: { duration: 0.3 },
    });
  };

  return (
    <div
      className="flex flex-col no-drag transition-all duration-500 cursor-pointer hover:-translate-y-0.5"
      onMouseMove={handleMouseMove}
      onClick={() => router.push("/")}
    >
      <motion.h1
        ref={h1Ref}
        style={{
          //backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #70A924, #436515)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
        animate={animation}
        className={`${top ? "text-5xl sm:text-7xl" : "text-5xl"} drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)] relative font-kaushan bg-gradient-to-r from-[#a1eb41] to-[#58831b] bg-clip-text text-transparent text-nowrap`}
      >
        Leaf Llama
        <span
          className="inline-block"
          style={{
            transform: top
              ? "translate(-95px, -35px)"
              : "translate(-60px, -20px)",
          }}
        >
          <Image src={leaf} alt="" className={`w-6 h-6`} />
        </span>
      </motion.h1>
      {/* Leaf above the "a" */}

      <p className="text-sm text-[#436515] w-[75%] text-right">CAFE</p>
    </div>
  );
};

export default Title;
