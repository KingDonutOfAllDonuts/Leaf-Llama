"use client"
import React, {useEffect } from "react";
import { delay, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FadeInUp = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`fade-in-up ${inView ? 'visible' : ''}`} // Conditionally apply class
    >
      {children}
    </div>
  );
};

export default FadeInUp;