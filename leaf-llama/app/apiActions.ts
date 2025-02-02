"use server";
import axios from "axios";

const handleAPI = async (route, params, crud) => {
  let tries = 0;
  while (tries < 3) {
    tries++;
    try {
      const response = await axios[crud](process.env.API_URL + route, params);
      return response.data;
    } catch (err) {
      console.log(err + " | try:" + tries);
    }
  }
  return false;
};

export const handleAddOrder = async (cart, details) => {
  return await handleAPI(
    "add",
    {
      cart,
      details,
      date: Date.now(),
    },
    "post"
  );
};

export const handleGetOrders = async (orderIds) => {
  return await handleAPI(
    "get",
    {
      orderIds,
    },
    "post"
  );
};

export const getAllOrders = async () => {
  return await handleAPI("getAll", {}, "get");
};

export const updateOrderStatus = async (id) => {
  return await handleAPI(`toggleDone/${id}`, {}, "put");
};

export const fetchAccountData = async (token) => {
  return await handleAPI(
    "account",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    "get"
  );
};

export const handleAuthentication = async (url, employeeData) => {
  const data = await handleAPI(url, employeeData, "post");
  return data && data.token ? data.token : false;
};
