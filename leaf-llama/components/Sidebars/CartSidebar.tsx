import React from "react";
import { useAtom } from "jotai";
import { cartAtom } from "@/lib/store";
import Link from "next/link";
import Sidebar from "@/components/Sidebars/Sidebar";
import { FaTrashAlt } from "react-icons/fa";
import { formatPrice } from "@/lib/utils";

const CartSidebar = ({ cartSidebarOpen, toggleCartSidebar, openPopup }) => {
  const [cart, setCart] = useAtom(cartAtom);
  let cartPrice = 0;
  return (
    <Sidebar isOpen={cartSidebarOpen} toggleSideBar={toggleCartSidebar}>
      {/* top bar */}
      <div className="p-4 h-16 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold text-green-800">Veggie Cart</h2>
        <button
          className="text-red-500 text-2xl w-7"
          onClick={toggleCartSidebar}
        >
          &times;
        </button>
      </div>
      {/* items */}
      <div className="p-4 h-[calc(100vh-128px)] overflow-y-auto">
        {cart.length <= 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          cart.map((cartFood, i) => {
            cartPrice += cartFood.data.price * cartFood.quantity;
            return (
              <div
                onClick={() => {
                  toggleCartSidebar();
                  openPopup(cartFood.data);
                }}
                className="flex gap-2 border-b-2 py-3 px-2 cursor-pointer transition-all hover:bg-slate-100 hover:opacity-80"
                key={i}
              >
                <p className="text-xl text-gray-500">{cartFood.quantity}</p>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between w-full">
                    <h3 className="font-medium text-black text-xl">
                      {cartFood.data.name}
                    </h3>
                    <div className="flex">
                      <h4 className="text-gray-500 text-sm">
                        {formatPrice(cartFood.data.price * cartFood.quantity)}
                      </h4>
                      <FaTrashAlt
                        className="w-4 h-4 ml-3 text-red-700 hover:text-red-300 transition-all"
                        onClick={(e) => {
                          e.stopPropagation(); // prevents the event from bubbling to the parent
                          cart.splice(i, 1);
                          setCart([...cart]);
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 pl-2">
                    {Object.values(cartFood).map((v, i) => {
                      return (
                        <p key={i}>
                          {Array.isArray(v)
                            ? v.map((vv, i) => {
                                return vv + (i != v.length - 1 ? ", " : "");
                              })
                            : typeof v == "string"
                              ? v
                              : ""}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* checkut */}
      <div className="h-16 p-4 border-t bg-gray-100 flex justify-center items-center">
        <Link
          href={"/order/checkout"}
          className="w-full bg-green-500 text-center text-white py-2 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-200"
          //onClick={handleCheckout}
        >
          Checkout - {formatPrice(cartPrice)}
        </Link>
      </div>
    </Sidebar>
  );
};

export default CartSidebar;
