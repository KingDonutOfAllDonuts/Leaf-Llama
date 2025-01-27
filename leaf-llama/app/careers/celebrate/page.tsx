'use client'
import React from 'react'
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { vegetableAtom } from '@/lib/store';

const Celebrate = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const favVeg = useAtomValue(vegetableAtom)
  const colors = [
    "bg-purple-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-red-500",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [colors.length]);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set dimensions only on the client side
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, []);
  return (
    <div
      className={`h-screen w-full flex items-center justify-center transition-colors duration-1000 ${colors[backgroundIndex]}`}
    >
      <Confetti width={dimensions.width} height={dimensions.height} />
      <div className="text-center p-8 bg-white bg-opacity-80 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-green-700">
          You are a perfect match with our criteria!
        </h1>
        <p className="text-lg text-gray-800 mb-6">
          Recruiter&apos;s comments: <br />
          <span className="font-semibold">
            I liked when you said your favorite vegetable was {favVeg}!
          </span>
        </p>
        <Link href="/careers/manage" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Visit the Employee Page
        </Link>
      </div>
    </div>
  );
}

export default Celebrate