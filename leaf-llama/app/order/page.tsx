"use client";
import AddToCartPopup from "@/components/AddToCartPopup";
import Navbar from "@/components/Navbars/Navbar";
import { others, salads, sides, smoothies } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { useAtom } from "jotai";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { FaExclamation } from "react-icons/fa";
import { cartAtom, ordersAtom } from "@/lib/store";
import CartSidebar from "@/components/Sidebars/CartSidebar";
import OrdersSidebar from "@/components/Sidebars/OrdersSidebar";
import { handleGetOrders } from "../apiActions";
import { FadeInUp } from "@/components/FadeInUp";
import sliver from "@/public/OrderSliver.jpg";
const yOffset = -100;
const sections = ["SALADS", "SMOOTHIES", "SIDES", "OTHERS"];

const Order = () => {
  const [activeSection, setActiveSection] = useState("");
  const [cartSidebarOpen, setCartSidebar] = useState(false);
  const [ordersSidebarOpen, setOrdersSidebar] = useState(false);
  const [cart, setCart] = useAtom(cartAtom);

  const [orderIds, setOrderIds] = useAtom(ordersAtom);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (
      orderIds.length > 0 &&
      (orders == null || (orders != null && orders.length <= 0))
    ) {
      handleGetOrders(orderIds)
        .then((result) => {
          if (!result) {
            console.log("fail");
            return;
          }
          const ids = [];
          for (const order of result) {
            ids.push(order._id);
          }
          setOrderIds(ids);
          setOrders(result);
        })
        .catch((err) => console.log(err));
    } else if (orderIds.length == 0 && orders == null) {
      setOrders([]);
    }
  }, [ordersSidebarOpen, orders]);

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
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const hasTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(hasTouch);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: isTouch ? 0.05 : 0.25 }
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
  }, [isTouch]);
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const yPosition =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full relative bg-gray-100">
      <Navbar />
      <div className="pt-[80px]">
        <h1 className="w-full text-center text-xl sm:text-3xl md:text-4xl lg:text-5xl p-10 lg:p-16 font-kaushan bg-white relative">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute z-10 h-full w-full bg-gray-500/10" />
            <Image
              className="w-full h-full object-cover"
              src={sliver}
              alt="Decorative background"
            />
          </div>
          <span className="relative text-gray-100 z-10 whitespace-nowrap">
            Thank you{" "}
            <span className="inline-block group">
              {["b", "e", "r", "r", "y"].map((letter, index) => (
                <span
                  key={index}
                  className={`inline-block hover:text-red-400 transition-all text-red-700 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)] animate-wave delay-${index * 100}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {letter}
                </span>
              ))}
            </span>{" "}
            much for your order!
          </span>
        </h1>
      </div>

      <div className="w-full">
        <div className="flex flex-row mt-10">
          {/* side bar */}
          <aside className="w-[100px] md:w-[220px] ml-2 md:ml-8 h-screen sticky top-0 flex items-center">
            <div className="w-full border rounded-xl border-gray-200 bg-white/95 backdrop-blur-sm sticky top-20 flex flex-col items-center px-2 py-4 space-y-4 shadow-sm">
              {/* Section Navigation */}
              <div className="w-full space-y-1.5">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`w-full px-3 py-2.5 text-left rounded-md transition-all duration-200
            ${
              activeSection === section
                ? "bg-green-50 border border-green-200 text-green-700 font-semibold"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            }
            text-xs md:text-lg font-medium`}
                  >
                    {section}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="w-full mt-auto space-y-3 px-1.5">
                <button
                  onClick={toggleCartSidebar}
                  className="group relative w-full flex items-center justify-center p-2 space-x-1.5
                 text-white bg-green-600 rounded-lg hover:bg-green-700 
                 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <MdAddShoppingCart className="text-lg md:text-2xl" />
                  <span className="text-sm md:text-lg font-medium hidden md:inline">
                    Cart ({cart.length})
                  </span>
                  {cart.length > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white 
                         text-[10px] w-5 h-5 rounded-full flex items-center justify-center
                         animate-pulse"
                    >
                      {cart.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={toggleOrdersSidebar}
                  className="group relative w-full flex items-center justify-center p-2 space-x-1.5
                 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 
                 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <span className="text-sm md:text-lg font-medium">Orders</span>
                  {orders?.length > 0 && (
                    <FaExclamation
                      className="absolute -top-1.5 -right-1.5 text-red-500 
                                   bg-white w-5 h-5 md:w-6 md:h-6 rounded-full p-0.5 shadow-sm 
                                   animate-pulse text-xs"
                    />
                  )}
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
        orders={orders}
        setOrders={setOrders}
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
      className="w-full group/food-category"
      id={title}
      ref={(el) => (sectionRefs.current[index] = el) as any}
    >
      <FoodTitle title={title.toUpperCase()} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-5 mb-10">
        {list.map((food, i) => (
          <FoodItem key={i} food={food} openPopup={openPopup} />
        ))}
      </div>
    </section>
  );
};

const FoodTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full px-5 md:px-28 pb-1 group/food-category">
      <FadeInUp>
        <h1 className="text-center text-3xl md:text-5xl font-kaushan p-2 w-full transition-all duration-1000 group-hover/food-category:tracking-wider group-hover/food-category:-translate-y-0.5">
          {title.charAt(0) + title.slice(1).toLowerCase()}
        </h1>
      </FadeInUp>
    </div>
  );
};

const FoodItem = ({ food, openPopup }) => {
  return (
    <FadeInUp>
      <div
        onClick={() => openPopup(food)}
        className="w-full group rounded-lg cursor-pointer group hover:shadow-lg transition-all hover:-translate-y-1.5 duration-500 flex flex-col shadow-sm bg-white border-gray-200 overflow-hidden"
      >
        <div className="relative overflow-hidden">
          <Image
            src={food.img}
            alt={food.name}
            className="w-full object-cover aspect-square transition-transform duration-500 group-hover:scale-105"
          />
          {/* <div className="absolute bottom-0 right-0 p-2">
            <MdAddShoppingCart className="bg-green-500 text-white rounded-full border border-green-950 p-1 md:p-2 text-xs md:text-base shadow-lg cursor-pointer w-7 md:w-10 h-7 md:h-10 transition-transform duration-300 hover:scale-110" />
          </div> */}
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="p-3">
            <h3 className="text-base md:text-xl text-green-800 group-hover:-translate-y-1 transition-transform duration-500">
              {food.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-500 group-hover:-translate-y-0.5 transition-transform duration-500">
              {formatPrice(food.price)}
            </p>
          </div>
          <div className="p-2">
            <MdAddShoppingCart className="bg-green-500 group-hover:rotate-12 text-white rounded-full p-2 text-xs group-hover:-translate-y-1 md:text-base shadow-xl cursor-pointer w-10 h-10 lg:w-11 lg:h-11 duration-500 transition-all group-hover:scale-110" />
          </div>
        </div>
      </div>
    </FadeInUp>
  );
};

export default Order;
