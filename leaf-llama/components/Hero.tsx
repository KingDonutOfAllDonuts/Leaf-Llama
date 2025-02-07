"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";

import Model from "@/public/Salad";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { TextGenerateEffect } from "./TextGenerate";
import Link from "next/link";
import Clouds from "@/public/cloud.png";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  const [displayText, setDisplayText] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const hasTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(hasTouch);
  }, []);
  console.log(isTouch);

  useEffect(() => {
    setTimeout(() => {
      setDisplayText(true);
    }, 2000);
  }, []);

  return (
    <div className="border-b-4 border-orange-600 h-screen w-screen bg-gradient-to-b from-blue-400 to-blue-200 overflow-hidden">
      <div className="absolute h-full w-full flex justify-end items-end"></div>
      {displayText ? (
        <div className="absolute flex flex-col h-[100vh] items-center p-5 justify-end z-50 w-full text-center no-drag pointer-events-none">
          <TextGenerateEffect
            words="Lettuce Eat!"
            className="text-6xl font-kaushan mb-2"
          />
          <Link
            href={"/menu"}
            className="px-8 py-2 mb-5 rounded-md bg-orange-500 text-white font-bold w-fit transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-orange-500 pointer-events-auto"
          >
            View The Menu
          </Link>
        </div>
      ) : (
        ""
      )}
      <Image
        src={Clouds}
        alt=""
        className="object-cover w-screen h-screen opacity-50 absolute no-drag"
      />
      <Canvas className="absolute h-full w-full">
        <PerspectiveCamera fov={30} makeDefault position={[2, 2.5, 0]} />
        {!isTouch ? (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 3}
            minPolarAngle={Math.PI / 3}
          />
        ) : (
          ""
        )}
        <ambientLight />
        <Suspense fallback={"loading"}>
          <Model position={[0, -1.85, 0]} />
        </Suspense>
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

export default Hero;
