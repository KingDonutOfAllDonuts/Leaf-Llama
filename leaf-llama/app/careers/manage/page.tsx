"use client";
import {
  fetchAccountData,
  getAllOrders,
  updateOrderStatus,
} from "@/app/apiActions";
import LoadingOverlay from "@/components/LoadingOverlay";
import ManageNavbar from "@/components/Navbars/ManageNavbar";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Manage = () => {
  const router = useRouter();
  const [account, setAccount] = useState(null);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (account != null) return;
    const token = localStorage.getItem("token");
    if (token && token !== "false") {
      fetchAccountData(token)
        .then((result) => {
          if (result) {
            setAccount(result);
          } else {
            router.push("/careers");
          }
        })
        .catch(() => router.push("/careers"));
    } else {
      router.push("/careers");
    }
  }, [account]);

  useEffect(() => {
    if (account == null) return;
    getAllOrders().then((result: Array<any>) => {
      const inProgress = result.filter((order) => !order.done);
      const complete = result.filter((order) => order.done);
      setOrders({ inProgress, complete });
    });
  }, [account]);

  const findOrder = (id, orders) => {
    for (const key in orders) {
      if (orders[key]._id == id) {
        return key;
      }
    }
    return null;
  };

  const inProgressToComplete = (id) => {
    const key = findOrder(id, orders.inProgress);
    if (key && orders.inProgress[key]) {
      // Clone the orders to avoid mutating the state directly
      const updatedOrders = { ...orders };

      // Remove the order from inProgress and add it to complete
      const order = updatedOrders.inProgress[key];
      updatedOrders.inProgress = updatedOrders.inProgress.filter(
        (_, index) => index != key
      );
      updatedOrders.complete = [...updatedOrders.complete, order];
      updateOrderStatus(order._id);
      // Update the state
      setOrders(updatedOrders);
    }
  };

  const completeToInProgress = (id) => {
    const key = findOrder(id, orders.complete);
    if (key && orders.complete[key]) {
      // Clone the orders to avoid mutating the state directly
      const updatedOrders = { ...orders };

      // Remove the order from inProgress and add it to complete
      const order = updatedOrders.complete[key];
      updatedOrders.complete = updatedOrders.complete.filter(
        (_, index) => index != key
      );
      updatedOrders.inProgress = [...updatedOrders.inProgress, order];

      // Update the state
      updateOrderStatus(order._id);
      setOrders(updatedOrders);
    }
  };

  return (
    <div className="w-full relative flex flex-col">
      <ManageNavbar account={account} />
      <div className="flex flex-grow p-4 mt-[85px]">
        {/* "In Progress" Section */}
        <div className="w-1/2 border rounded-lg p-4 shadow-md bg-white mr-4">
          <h2 className="text-green-600 font-bold mb-4 text-xl">In Progress</h2>
          {orders == null ? (
            ""
          ) : (
            <div>
              <OrdersDisplay
                orders={orders.inProgress}
                completed={false}
                onChecked={inProgressToComplete}
              />
            </div>
          )}
        </div>

        {/* "Completed" Section */}
        <div className="w-1/2 border rounded-lg p-4 shadow-md bg-white">
          <h2 className="text-blue-600 font-bold mb-4 text-xl">Completed</h2>
          {orders == null ? (
            ""
          ) : (
            <div>
              <OrdersDisplay
                orders={orders.complete}
                completed={true}
                onChecked={completeToInProgress}
              />
            </div>
          )}
        </div>
      </div>
      <LoadingOverlay isLoading={!orders} />
    </div>
  );
};

const OrdersDisplay = ({ orders, completed, onChecked }) => {
  const [openItemIndex, setOpenItemIndex] = useState(null);
  const toggleDropdown = (index) => {
    setOpenItemIndex(openItemIndex === index ? null : index);
  };
  if (orders == null || orders.length == 0) {
    return completed ? (
      <p>No completed orders.</p>
    ) : (
      <p>No orders in progress.</p>
    );
  }
  return (
    <div>
      {orders.map((order, index) => (
        <div
          key={order._id}
          className="flex flex-col gap-2 border m-2 bg-gray-50 rounded-lg py-3 px-2"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {order.details.serviceType == "pickup"
                ? "Pick Up"
                : `Table Number: ${order.details.tableNumber}`}{" "}
              -{" "}
              <span className="text-sm text-gray-500">
                {new Date(order.date).toLocaleString()}
              </span>
            </h3>
            <input
              className="h-5 w-5"
              type="checkbox"
              checked={completed}
              onChange={() => onChecked(order._id)}
            />
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
                                    return vv + (i != v.length - 1 ? ", " : "");
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
      ))}
    </div>
  );
};

export default Manage;
