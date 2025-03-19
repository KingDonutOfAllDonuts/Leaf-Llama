"use client";
import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import QuantitySelector from "./QuantitySelector";
import { useEffect, useRef, useState } from "react";
import { optionTypes } from "@/lib/constants";
import { useAtom, useAtomValue } from "jotai";
import { navbarAtom } from "@/lib/store";

const AddToCartPopup = ({ isOpen, foodData, closePopup, handleSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [incompleteOptions, setIncompleteOptions] = useState([]);
  const [showNavbar, setShowNavbar] = useAtom(navbarAtom);

  const optionRefs = useRef({});
  // useEffect(() => {
  //   if (isOpen && showNavbar && foodData) {
  //     console.log("hello");
  //     console.log(isOpen);
  //     setShowNavbar(false);
  //   }
  // }, [isOpen, showNavbar, setShowNavbar, foodData]);
  const handleOptionChange = (optionName, value, isMultiple) => {
    setSelectedOptions((prev) => {
      if (isMultiple) {
        const currentValues = prev[optionName] || [];
        if (currentValues.includes(value)) {
          // Remove value if already selected
          return {
            ...prev,
            [optionName]: currentValues.filter((v) => v !== value),
          };
        } else {
          // Add value if not selected
          return {
            ...prev,
            [optionName]: [...currentValues, value],
          };
        }
      } else {
        // Singular: Replace the selected value
        return { ...prev, [optionName]: value };
      }
    });
  };
  const validateAndSubmit = () => {
    if (!foodData?.customization) return;

    const missingOptions = optionTypes.singular.filter(
      (option) => foodData.customization[option] && !selectedOptions[option] // Check for missing singular options
    );

    if (missingOptions.length > 0) {
      // Highlight missing options
      setIncompleteOptions(missingOptions);

      // Scroll to the first incomplete option
      const firstMissingOption = missingOptions[0];
      if (optionRefs.current[firstMissingOption]) {
        optionRefs.current[firstMissingOption].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    // Reset incomplete options if validation passes
    setIncompleteOptions([]);

    // Proceed with form submission
    handleSubmit({ ...selectedOptions, quantity });
  };

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedOptions({});
    setQuantity(1);
    if (foodData?.customization) {
      const initialOptions = Object.keys(foodData.customization).reduce(
        (acc, key) => ({
          ...acc,
          [key]: optionTypes.multiple.includes(key) ? [] : "", // Array for multiple, string for singular
        }),
        {}
      );
      initialOptions["data"] = foodData;
      setSelectedOptions(initialOptions);
    }
  }, [foodData]);

  return (
    <AnimatePresence>
      {isOpen && foodData != null && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[1000]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl max-w-[1200px] max-h-[800px] w-[90%] h-[90vh] relative flex flex-col"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute -right-2 -top-2 z-10 bg-white rounded-full p-2 shadow-lg hover:scale-105 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content Container */}
            <div className="w-full text-center text-2xl text-green-800 py-1">
              {foodData.name}
              <p className="text-center text-gray-600 text-sm italic px-4 mx-auto">
                {foodData.desc}
              </p>
            </div>
            <div className="flex flex-col max-md:overflow-y-scroll md:overflow-hidden md:flex-row-reverse flex-1 min-h-0">
              {/* Image Section */}
              <div className="w-full md:w-1/2 space-y-4 flex items-center justify-center bg-gray-50">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={foodData.img}
                    alt={foodData.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Options Section */}
              <div className="md:flex-1 space-y-6 p-1 md:overflow-auto bg-gray-50">
                {foodData.customization &&
                  Object.keys(foodData.customization).map((optionName) => {
                    const isMultiple =
                      optionTypes.multiple.includes(optionName);

                    return (
                      <div
                        key={optionName}
                        ref={(el) =>
                          (optionRefs.current[optionName] = el) as any
                        }
                        className={`bg-gray-50 rounded-lg p-4 ${
                          incompleteOptions.includes(optionName)
                            ? "ring-2 ring-red-500"
                            : ""
                        }`}
                      >
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 capitalize">
                          {optionName.replace("_", " ")}
                          {incompleteOptions.includes(optionName) && (
                            <span className="text-red-500 text-sm ml-2">
                              (required)
                            </span>
                          )}
                        </h4>

                        <div className="grid grid-cols-1 gap-2">
                          {foodData.customization[optionName].map((value) => (
                            <label
                              key={value}
                              className={`flex items-center p-3 rounded-md cursor-pointer transition-all ${
                                (
                                  isMultiple
                                    ? selectedOptions[optionName]?.includes(
                                        value
                                      )
                                    : selectedOptions[optionName] === value
                                )
                                  ? "bg-green-50 border-2 border-green-600"
                                  : "bg-white hover:bg-gray-50 border-2 border-gray-200"
                              }`}
                            >
                              <input
                                type={isMultiple ? "checkbox" : "radio"}
                                name={optionName}
                                value={value}
                                checked={
                                  isMultiple
                                    ? selectedOptions[optionName]?.includes(
                                        value
                                      ) || false
                                    : selectedOptions[optionName] === value ||
                                      false
                                }
                                onChange={() =>
                                  handleOptionChange(
                                    optionName,
                                    value,
                                    isMultiple
                                  )
                                }
                                className={`${
                                  isMultiple ? "rounded" : "rounded-full"
                                } w-5 h-5 border-2 border-gray-300 accent-green-600 focus:ring-green-500 focus:ring-offset-2`}
                              />
                              <span className="text-gray-800 ml-3">
                                {value}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-2 shadow-lg rounded-xl">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                  // className="w-full md:w-auto"
                />
                <button
                  onClick={validateAndSubmit}
                  className="w-full md:w-auto px-8 md:px-20 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  Add to Cart - {formatPrice(foodData.price * quantity)}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddToCartPopup;
