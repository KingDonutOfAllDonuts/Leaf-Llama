"use client";
import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import QuantitySelector from "./QuantitySelector";
import { useEffect, useRef, useState } from "react";
import { optionTypes } from "@/lib/constants";
import { useAtomValue } from "jotai";
import { navbarAtom } from "@/lib/store";

const AddToCartPopup = ({ isOpen, foodData, closePopup, handleSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [incompleteOptions, setIncompleteOptions] = useState([]);
  const showNavbar = useAtomValue(navbarAtom);

  const optionRefs = useRef({});

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
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-300 ${showNavbar ? "mt-[85px]" : ""}`}
          style={{ height: showNavbar ? "calc(100vh - 85px)" : "100vh" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg md:w-[600px] w-[450px] h-full relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* top bar */}
            <div className="h-10 border-b-2 border-b-orange-500">
              <button
                onClick={closePopup}
                className="w-8 h-8 absolute left-2 font-bold text-2xl rounded text-red-700"
              >
                &times;
              </button>
              <h3 className="w-full text-2xl h-full text-center align-middle leading-10 font-kaushan text-green-800">
                {foodData.name}
              </h3>
            </div>
            {/* form div */}
            <div className="w-full h-[calc(100%-40px)] overflow-y-auto p-5">
              {/* details */}
              <Image
                src={foodData.img}
                alt=""
                className="w-full object-cover aspect-square rounded-lg border-black border-2"
              />
              <div className="border-b-2 border-orange-500 pb-2">
                <h3 className="text-2xl text-green-800">{foodData.name}</h3>
                <p className="text-sm text-gray-600 my-1">
                  {formatPrice(foodData.price)}
                </p>
                <p className="text-sm text-gray-700">{foodData.desc}</p>
              </div>

              {/* form stuff */}
              <div className="p-2">
                {/* Options */}
                {foodData.customization &&
                  Object.keys(foodData.customization).map((optionName) => {
                    const isMultiple =
                      optionTypes.multiple.includes(optionName);

                    return (
                      <div
                        key={optionName}
                        className={`space-y-2 border-b border-gray-400 p-2 pb-4 mb-1 ${
                          incompleteOptions.includes(optionName)
                            ? "border border-red-500 rounded p-2"
                            : ""
                        }`}
                        ref={(el) =>
                          (optionRefs.current[optionName] = el) as any
                        }
                      >
                        <h4 className="text-lg font-medium text-gray-800 capitalize">
                          {optionName.replace("_", " ")}
                        </h4>

                        {foodData.customization[optionName].map((value) => (
                          <label
                            key={value}
                            className="flex items-center space-x-3 cursor-pointer group"
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
                              className="w-5 h-5 text-white border-gray-400 rounded-full focus:ring-green-500 accent-green-600"
                            />
                            <span className="text-gray-800 group-hover:text-green-700 transition-colors">
                              {value}
                            </span>
                          </label>
                        ))}
                      </div>
                    );
                  })}

                {/* Add to Cart Button */}
                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => validateAndSubmit()}
                    className="w-full bg-green-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-200"
                  >
                    Add to Cart - {formatPrice(foodData.price * quantity)}
                  </button>
                  <QuantitySelector value={quantity} onChange={setQuantity} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddToCartPopup;
