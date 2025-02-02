import React, { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { cartAtom, ordersAtom } from "@/lib/store";
import Link from "next/link";
import Sidebar from "@/components/Sidebars/Sidebar";
import { FaTrashAlt } from "react-icons/fa";
import { formatPrice } from "@/lib/utils";
import { handleGetOrders } from "@/app/apiActions";
import RefreshButton from "../RefreshButton";

const OrdersSidebar = ({
  ordersSidebarOpen,
  toggleOrdersSidebar,
  openPopup,
}) => {
  const [orderIds, setOrderIds] = useAtom(ordersAtom);
  const [orders, setOrders] = useState(null);

  const [openItemIndex, setOpenItemIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenItemIndex(openItemIndex === index ? null : index);
  };

  useEffect(() => {
    if (orderIds.length > 0 && ordersSidebarOpen && orders == null) {
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
      console.log("hello");
    }
    console.log(orderIds);
  }, [ordersSidebarOpen, orders]);
  return (
    <Sidebar isOpen={ordersSidebarOpen} toggleSideBar={toggleOrdersSidebar}>
      {/* top bar */}
      <div className="p-4 h-16 flex justify-between items-center border-b">
        <div className="flex flex-row gap-3 items-center">
          <h2 className="text-2xl font-semibold text-black font-kaushan">
            Your Orders
          </h2>
          <RefreshButton onClick={() => setOrders(null)} />
        </div>
        <button
          className="text-red-500 text-2xl w-7"
          onClick={toggleOrdersSidebar}
        >
          &times;
        </button>
      </div>
      {/* items */}
      <div className="p-2 h-full overflow-y-auto">
        {orders == null ? (
          <p>Your orders are loading!</p>
        ) : orders.length <= 0 ? (
          <p>You have no orders yet!</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={order._id}
              className="flex flex-col gap-2 border-b-2 py-3 px-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  Order #{index + 1} -{" "}
                  <span className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleString()}
                  </span>
                </h3>
                <span
                  className={`text-sm font-medium ${
                    order.done ? "text-green-600" : "text-yellow-500"
                  }`}
                >
                  {order.done ? "Completed" : "Pending"}
                </span>
              </div>

              {/* cart */}
              <ul className="pl-4">
                {order.cart.map((item, idx) => (
                  <li
                    key={item.data.name + idx}
                    className="text-sm text-gray-700 mb-4"
                  >
                    {/* Main item row - clickable */}
                    <div
                      className="cursor-pointer flex justify-between items-center transition-all hover:text-gray-700"
                      onClick={() => toggleDropdown(idx + "" + index)}
                    >
                      <span>
                        {item.quantity} x {item.data.name} -{" "}
                        {formatPrice(item.data.price * item.quantity)}
                      </span>
                      <span className="text-gray-500 no-drag">
                        {openItemIndex === idx + "" + index ? "▲" : "▼"}
                      </span>
                    </div>

                    {/* Dropdown with Slide Animation */}
                    <div
                      className={`overflow-hidden transition-all ease-in-out ${
                        openItemIndex === idx + "" + index
                          ? "max-h-screen"
                          : "max-h-0"
                      }`}
                    >
                      <div className="text-xs text-gray-500 pl-2 no-drag">
                        <ul>
                          <div className="text-xs text-gray-500">
                            {Object.values(item).map((v, i) => {
                              return (
                                <p key={i}>
                                  {Array.isArray(v) && v.length != 0
                                    ? "- " +
                                      v.map((vv, i) => {
                                        return (
                                          vv + (i != v.length - 1 ? ", " : "")
                                        );
                                      })
                                    : typeof v == "string"
                                      ? "- " + v
                                      : ""}
                                </p>
                              );
                            })}
                          </div>
                        </ul>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Order Details */}
              <div className="text-sm text-gray-600">
                <strong>Details:</strong>{" "}
                {order.details
                  ? `${order.details.comments} (${order.details.contactInfo})`
                  : "No details provided"}
              </div>
            </div>
          ))
        )}
      </div>
    </Sidebar>
  );
};

export default OrdersSidebar;
