"use client";
import { handleAddOrder } from "@/app/apiActions";
import { cartAtom, ordersAtom } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaTimes, FaTimesCircle } from "react-icons/fa";
import LoadingOverlay from "./LoadingOverlay";
import { motion } from "framer-motion";
const CheckoutInfo = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const setOrders = useSetAtom(ordersAtom);
  const [serviceType, setServiceType] = useState("pickup");
  const [submitLoading, setSubmitLoading] = useState(false); /////////////////////////////////////////////////////////////////////////////FINISH THIS OR SELLSLEL
  const [tableNumber, setTableNumber] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [comments, setComments] = useState("");
  const [tipPercentage, setTipPercentage] = useState(0.15);
  const [incompleteOptions, setIncompleteOptions] = useState([]);
  const optionRefs = useRef({});

  const [orderIsFinished, setOrderIsFinished] = useState<any>(null);
  const closePopup = () => {
    setOrderIsFinished(null);
  };
  const handleTipChange = (percentage) => {
    setTipPercentage(percentage);
  };
  const emptyCart = () => {
    setCart([]);
  };

  const validateOrder = async () => {
    if (submitLoading) {
      return;
    }
    setSubmitLoading(true);
    // Check if the cart is empty
    const incomplete = [];
    if (cart.length === 0) {
      alert(
        "Your cart is empty. Please add items to your cart before placing an order."
      );
      setSubmitLoading(false);
      return;
    }

    // Validate contact information
    if (!contactInfo.trim()) {
      incomplete.push("contact");
    }

    // Validate service type
    if (
      serviceType === "dineIn" &&
      (!tableNumber || parseInt(tableNumber) <= 0)
    ) {
      incomplete.push("tableNumber");
    }

    if (incomplete.length > 0) {
      setIncompleteOptions(incomplete);

      // Scroll to the first incomplete option
      const firstMissingOption = incomplete[0];
      if (optionRefs.current[firstMissingOption]) {
        optionRefs.current[firstMissingOption].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      setSubmitLoading(false);
      return;
    }
    // If all validations pass
    setOrderIsFinished(
      await handleAddOrder(cart, {
        serviceType,
        tableNumber,
        contactInfo,
        comments,
        tipPercentage,
      })
    );
    setSubmitLoading(false);
  };

  let cartPrice = 0;
  return (
    <>
      <div className="flex w-full justify-center space-x-32 px-5 md:px-20 pb-20">
        {/* pricing information */}
        <div className="px-5 flex justify-center mb-5">
          {/* form */}
          <div className="w-1/2 mx-[25px] md:mx-[100px]">
            <h1 className="text-base md:text-xl text-green-800 mb-4">
              Order Details
            </h1>
            <div className="flex flex-col space-y-4">
              {/* Pickup or Table Service */}
              <div>
                <label className="block md:text-base text-sm text-gray-700 font-medium mb-2">
                  Service Type:
                </label>
                <select
                  className="border border-gray-300 p-2 rounded w-full"
                  name="serviceType"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  <option value="pickup" className="md:text-base text-sm">
                    Pickup
                  </option>
                  <option value="dineIn" className="md:text-base text-sm">
                    Dine In
                  </option>
                </select>
              </div>

              {/* Table Number (conditional on dine-in) */}
              {serviceType === "dineIn" && (
                <div>
                  <label className="block md:text-base text-sm text-gray-700 font-medium mb-2">
                    Table Number:
                  </label>
                  <input
                    type="number"
                    placeholder="Enter table number"
                    className={`border md:text-base text-sm border-gray-300 p-2 rounded w-full ${
                      incompleteOptions.includes("tableNumber")
                        ? "border-4 border-red-500 rounded p-2"
                        : ""
                    }`}
                    min="1"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    ref={(el) =>
                      (optionRefs.current["tableNumber"] = el) as any
                    }
                  />
                </div>
              )}

              {/* Contact Information */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 md:text-base text-sm">
                  Contact Information:
                </label>
                <input
                  type="text"
                  placeholder="Enter Contact Information"
                  className={`border border-gray-300 p-2 rounded w-full md:text-base text-sm ${
                    incompleteOptions.includes("contact")
                      ? "border-red-500 border-4 rounded p-2"
                      : ""
                  }`}
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  ref={(el) => (optionRefs.current["contact"] = el) as any}
                />
              </div>

              {/* Tip Selection */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 md:text-base text-sm">
                  Tip:
                </label>
                <div className="flex space-x-2 md:space-x-4">
                  {[0, 0.1, 0.15, 0.2].map((percentage) => (
                    <button
                      key={percentage}
                      type="button"
                      className={`md:text-base text-xs px-2 py-1 md:py-4 md:px-4 rounded transition-all ${
                        tipPercentage === percentage
                          ? "bg-green-800 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      onClick={() => handleTipChange(percentage)}
                    >
                      {percentage == 0 ? "No Tip" : percentage * 100 + "%"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block md:text-base text-sm text-gray-700 font-medium mb-2">
                  Additional Comments:
                </label>
                <textarea
                  placeholder="Enter any special requests or comments"
                  className="border md:text-base text-sm border-gray-300 p-2 rounded w-full"
                  rows={4}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                className="bg-green-800 text-white py-2 px-4 rounded md:text-base text-sm hover:bg-green-700 hover:scale-105 active:scale-95 transition-all"
                onClick={validateOrder}
              >
                {submitLoading ? "Order is Being Placed....." : "Place Order"}
              </button>
            </div>
          </div>

          <div className="mb-5">
            <h1 className="text-base md:text-xl text-green-800">Your Cart</h1>
            {/* items */}
            <div className="flex flex-col">
              {cart.map((cartFood, i) => {
                cartPrice += cartFood.data.price * cartFood.quantity;
                return (
                  <div
                    className="flex gap-2 border-b-2 py-1.5 px-2 transition-all w-full"
                    key={i}
                  >
                    <p className="text-base md:text-xl text-gray-500">
                      {cartFood.quantity}
                    </p>
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between w-full">
                        <h3 className="font-medium md:text-lg text-sm text-black">
                          {cartFood.data.name}
                        </h3>
                        <div className="flex">
                          <h4 className="text-gray-500 text-xs md:text-sm">
                            {formatPrice(
                              cartFood.data.price * cartFood.quantity
                            )}
                          </h4>
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-gray-500 p-1">
                        {cartFood.data.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between border-b-2 py-4 items-center px-2 transition-all w-full">
                <h3 className="text-base md:text-lg">Cart Price: </h3>
                <h4 className="text-gray-500 text-sm">
                  {formatPrice(cartPrice)}
                </h4>
              </div>
              <div className="flex justify-between py-2 items-center px-2 transition-all w-full">
                <h3 className="text-base md:text-lg">Tax: </h3>
                <h4 className="text-gray-500 text-xs md:text-sm">
                  {formatPrice(cartPrice * 0.0825)}
                </h4>
              </div>
              <div className="flex justify-between border-b-2 py-2 items-center px-2 transition-all w-full">
                <h3 className="text-base md:text-lg">Tip: </h3>
                <h4 className="text-gray-500 text-sm">
                  {formatPrice(cartPrice * tipPercentage)}({tipPercentage * 100}
                  %)
                </h4>
              </div>
              <div className="flex justify-between border-b-2 py-3 items-center px-2 transition-all w-full">
                <h3 className="text-base md:text-lg">Total: </h3>
                <h4 className="text-gray-500 text-sm">
                  {formatPrice(
                    Math.round(cartPrice * tipPercentage * 100) / 100 +
                      Math.round(cartPrice * 0.0825 * 100) / 100 +
                      cartPrice
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderPlacedPopup
        orderResponse={orderIsFinished}
        onClose={closePopup}
        emptyCart={emptyCart}
      />
      <LoadingOverlay isLoading={submitLoading} />
    </>
  );
};

const OrderPlacedPopup = ({ orderResponse, onClose, emptyCart }) => {
  const [orders, setOrders] = useAtom(ordersAtom);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (orderResponse) {
      setIsVisible(true);
      if (orderResponse !== false) {
        emptyCart();
        setOrders([...orders, orderResponse._id]);
      } else {
        setIsVisible(false);
      }
    }
  }, [orderResponse]);

  if (!isVisible) return null;

  let content;
  if (orderResponse === false) {
    content = (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center h-full p-8 text-center"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping" />
          <FaTimesCircle
            size={80}
            className="mb-6 text-red-500 drop-shadow-sm"
          />
        </div>
        <h2 className="text-3xl font-bold text-red-600 mb-2">Order Failed</h2>
        <p className="text-gray-600 mb-6">
          We couldn't process your payment. Please try again.
        </p>
        <button
          className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-full 
          font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={onClose}
        >
          Try Again
        </button>
      </motion.div>
    );
  } else {
    content = (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center h-full p-8 text-center"
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping" />
          <FaCheckCircle
            size={80}
            className="text-green-500 drop-shadow-sm animate-pop-in"
          />
        </div>
        <h2 className="text-3xl font-bold text-green-600 mb-2">
          Order Confirmed!
        </h2>
        <p className="text-gray-600 mb-6">Your delicious meal is on its way!</p>
        <div className="flex gap-4">
          <Link
            href={"/order"}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-full 
            font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Back to Order
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <motion.div
        initial={{ y: 25 }}
        animate={{ y: 0 }}
        className="relative bg-white rounded-2xl shadow-2xl w-[95%] max-w-md overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-600 transition-colors"
        >
          <FaTimes size={20} />
        </button>
        {content}
      </motion.div>
    </motion.div>
  );
};

export default CheckoutInfo;
