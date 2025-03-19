import React, { useState } from "react";
import Title from "../Title";
import Link from "next/link";

import { HiMiniArrowLeftEndOnRectangle } from "react-icons/hi2";
import { navButtons } from "@/lib/constants";
import MiniNavbarMenu from "../MiniNavbarMenu";

const CheckoutNavbar = () => {
  return (
    <nav className="z-[900] flex h-[85px] justify-center items-center px-6 py-2.5 fixed w-full bg-white border-b-2 border-orange-600">
      <Link
        href="/order"
        className="text-base absolute ml-2 left-0 md:text-xl whitespace-nowrap flex items-center space-x-2 hover:opacity-75 transition-all"
      >
        <HiMiniArrowLeftEndOnRectangle />
        <span className="">Back & Change Order</span>
      </Link>
      <div className="max-md:hidden">
        <Title top={false} />
      </div>
      <div className=" absolute right-0 mr-4">
        <MiniNavbarMenu hidden={false} />
      </div>
    </nav>
  );
};

export default CheckoutNavbar;
