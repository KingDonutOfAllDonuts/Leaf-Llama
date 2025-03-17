"use client";
import React, { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  full?: boolean;
  variant?: "up" | "left" | "right";
}

const transformConfig = {
  up: {
    exit: "translate-y-1",
    enter: "-translate-y-1 opacity-100",
  },
  left: {
    exit: "-translate-x-6",
    enter: "translate-x-0 opacity-100",
  },
  right: {
    exit: "translate-x-6",
    enter: "translate-x-0 opacity-100",
  },
};

const FadeIn = ({ children, full = false, variant = "up" }: FadeInProps) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isIntersecting
          ? transformConfig[variant].enter
          : `${transformConfig[variant].exit} opacity-0`
      } ${full ? "w-full h-full" : ""}`}
    >
      {children}
    </div>
  );
};

export const FadeInUp = (props: Omit<FadeInProps, "variant">) => (
  <FadeIn variant="up" {...props} />
);

export const FadeInLeft = (props: Omit<FadeInProps, "variant">) => (
  <FadeIn variant="left" {...props} />
);

export const FadeInRight = (props: Omit<FadeInProps, "variant">) => (
  <FadeIn variant="right" {...props} />
);

export default FadeIn;
