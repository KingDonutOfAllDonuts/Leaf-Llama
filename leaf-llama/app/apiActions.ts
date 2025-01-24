'use server'
import axios from "axios";


export const handleAddOrder = async (cart, details) => {
  try {
    const response = await axios.post(process.env.API_URL+'add', { //add to the stuffy stuff env
      cart,
      details,
      date: Date.now()
    });
    console.log('order placed')
    return response.data
  } catch (err) {
    return false
  }
};

export const handleGetOrders = async (orderIds) => {
  try {
    const response = await axios.post(process.env.API_URL+'get', orderIds);
    return response.data
  } catch (err) {
    return false
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(process.env.API_URL+'getAll');
    return response.data
  } catch (err) {
    console.log(err)
    return false
  }
};

export const updateOrderStatus = async(id) => {
  try {
    axios.put(`${process.env.API_URL}toggleDone/${id}`)
  } catch (err) {
    console.log(err)
    return false
  }
  
}

export const fetchAccountData = async (token) => {
  try {
    const response = await axios.get(`${process.env.API_URL}account`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching account data:', error.response?.data || error.message);
    throw error;
  }
};

export const handleAuthentication = async (url, employeeData) => {
  try {
    const response = await axios.post(`${process.env.API_URL}${url}`, employeeData);

    return response.data.token; 
  } catch (err) {
    console.error('Error during authentication:', err.response?.data || err.message);
    return false; // Indicate failure
  }
};

// const handleLogin = async () => {
//   const loginData = {
//     email: 'johndoe@example.com',
//     password: 'securepassword123',
//   };

//   const result = await handleAuthentication('login', loginData);

//   if (result) {
//     console.log('Login successful:', result);
//   } else {
//     console.log('Login failed');
//   }
// };
