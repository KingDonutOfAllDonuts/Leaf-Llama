"use client";
import AddToCartPopup from "@/components/AddToCartPopup";
import Navbar from "@/components/Navbars/Navbar";
import { others, salads, sides, smoothies } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { useAtom } from "jotai";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { cartAtom } from "@/lib/store";
import CartSidebar from "@/components/Sidebars/CartSidebar";
import OrdersSidebar from "@/components/Sidebars/OrdersSidebar";

const yOffset = -100;
const sections = ["SALADS", "SMOOTHIES", "SIDES", "OTHERS"];

const Order = () => {
  const [activeSection, setActiveSection] = useState("");
  const [cartSidebarOpen, setCartSidebar] = useState(false);
  const [ordersSidebarOpen, setOrdersSidebar] = useState(false);
  const [cart, setCart] = useAtom(cartAtom);

  const toggleCartSidebar = () => {
    setCartSidebar((prev) => {
      return !prev;
    });
  };
  const toggleOrdersSidebar = () => {
    setOrdersSidebar((prev) => {
      return !prev;
    });
  };

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  //popup functions
  const [{ popupIsOpen, foodData }, setPopup] = useState({
    popupIsOpen: true,
    foodData: null,
  });
  const openPopup = (foodData) => {
    setPopup({ popupIsOpen: true, foodData });
  };
  const closePopup = () => {
    setPopup({ popupIsOpen: false, foodData: null });
  };

  const handleSubmit = (selectedOptions) => {
    closePopup();
    console.log(selectedOptions);
    setCart([...cart, selectedOptions]);
    toggleCartSidebar();
  };
  // detect what in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      // Clean up the observer on unmount
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const yPosition =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full relative">
      <Navbar />

      <div className="pt-[92px] w-full">
        <div className="flex flex-row mt-10">
          {/* side bar */}
          <aside className="w-[100px] md:w-[200px] m-2 ml-10 rounded overflow-hidden">
            <div className="w-[100px] md:w-[200px] border rounded border-gray-600 fixed top-1/2 transform -translate-y-1/2 flex flex-col items-start">
              {sections.map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`md:pl-4 md:text-2xl mx-2 my-3 md:m-5 text-green-700 hover:text-green-500 transition-all   ${
                    activeSection === section ? "font-bold" : "font-normal"
                  }`}
                >
                  {section}
                </button>
              ))}

              {/* buttons */}
              <div className="flex w-full mb-5 gap-2">
                <button
                  onClick={toggleCartSidebar}
                  className="flex items-center justify-center w-1/2 text-xl p-2 md:ml-2 text-white bg-green-700 rounded-full hover:bg-green-600 hover:-translate-y-0.5 transition-all"
                >
                  <MdAddShoppingCart className="text-2xl" />
                  <span className="text-2xl font-medium max-md:hidden">
                    ({cart.length})
                  </span>
                </button>
                <button
                  onClick={toggleOrdersSidebar}
                  className="flex items-center justify-center w-1/2 md:text-xl text-xs p-1 md:p-2 md:mr-2 text-white bg-gray-600 rounded-full hover:bg-gray-500 hover:-translate-y-0.5 transition-all"
                >
                  Orders
                </button>
              </div>
            </div>
          </aside>

          {/* the other side */}
          <div className="flex-1">
            <FoodCatagory
              title="SALADS"
              list={salads}
              sectionRefs={sectionRefs}
              index={0}
              openPopup={openPopup}
            />
            <FoodCatagory
              title="SMOOTHIES"
              list={smoothies}
              sectionRefs={sectionRefs}
              index={1}
              openPopup={openPopup}
            />
            <FoodCatagory
              title="SIDES"
              list={sides}
              sectionRefs={sectionRefs}
              index={2}
              openPopup={openPopup}
            />
            <FoodCatagory
              title="OTHERS"
              list={others}
              sectionRefs={sectionRefs}
              index={3}
              openPopup={openPopup}
            />
          </div>
        </div>
      </div>

      {/* cart side bar */}
      <CartSidebar
        cartSidebarOpen={cartSidebarOpen}
        toggleCartSidebar={toggleCartSidebar}
        openPopup={openPopup}
      />
      <OrdersSidebar
        ordersSidebarOpen={ordersSidebarOpen}
        toggleOrdersSidebar={toggleOrdersSidebar}
        openPopup={openPopup}
      />
      <AddToCartPopup
        isOpen={popupIsOpen}
        closePopup={closePopup}
        foodData={foodData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

const FoodCatagory = ({ title, list, sectionRefs, index, openPopup }) => {
  return (
    <section
      className="w-full"
      id={title}
      ref={(el) => (sectionRefs.current[index] = el) as any}
    >
      <FoodTitle title={title.toUpperCase()} />
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-7 w-full p-5 mb-10">
        {list.map((food, i) => (
          <FoodItem key={i} food={food} openPopup={openPopup} />
        ))}
      </div>
    </section>
  );
};

const FoodTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full px-28 pb-5">
      <h1 className="text-center text-xl sm:text-3xl md:text-5xl font-kaushan p-2 w-full border-b-4 border-green-500 rounded-xl">
        {title}
      </h1>
    </div>
  );
};

const FoodItem = ({ food, openPopup }) => {
  return (
    <div
      onClick={() => openPopup(food)}
      className="w-full rounded-lg cursor-pointer hover:border-gray-900 transition-all flex flex-col border-2 hover:border-4 bg-white border-gray-500 overflow-hidden"
    >
      <Image
        src={food.img}
        alt="aaaa"
        className="w-full object-cover aspect-square"
      />
      <div className="w-full flex justify-end">
        <MdAddShoppingCart className="-mt-4 mr-1.5 -mb-3 bg-green-500 text-white rounded-full p-2 shadow-lg cursor-pointer w-10 h-10"></MdAddShoppingCart>
      </div>

      <div className="pb-2">
        <h3 className="font-kaushan text-base lg:text-xl text-green-800 w-full text-center -mt-1">
          {food.name}
        </h3>
        <p className="text-xs lg:text-sm text-gray-500 w-full text-left -mt-4 -mb-5 p-3">
          {formatPrice(food.price)}
        </p>
      </div>
    </div>
  );
};

export default Order;
