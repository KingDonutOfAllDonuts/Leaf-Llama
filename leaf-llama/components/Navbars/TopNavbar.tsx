"use client";
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import leaf from '@/public/leaf.png'
import Image from 'next/image';
import Title from '../Title';
import Link from 'next/link';
const TopNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll()
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed w-full z-[999]">
      <AnimatePresence mode="wait">
        {isScrolled ? (
          <motion.div
            key="scrolledNavbar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
          >
            <Navbar />
          </motion.div>
        ) : (
          <motion.div
            key="topNavbar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
            className="top-navbar"
          >
             <Navbar top={true}/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopNavbar;