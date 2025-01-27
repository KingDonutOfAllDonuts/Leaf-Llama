"use client"
import { handleAddOrder } from '@/app/apiActions'
import { cartAtom, ordersAtom } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const CheckoutInfo = () => {
  const [cart, setCart] =  useAtom(cartAtom)
  const setOrders = useSetAtom(ordersAtom)
  const [serviceType, setServiceType] = useState('pickup');
  const [submitLoading, setSubmitLoading] = useState(false) /////////////////////////////////////////////////////////////////////////////FINISH THIS OR SELLSLEL
  const [tableNumber, setTableNumber] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [comments, setComments] = useState('');
  const [tipPercentage, setTipPercentage] = useState(0.15);
  const [incompleteOptions, setIncompleteOptions] = useState([])
  const optionRefs = useRef({})

  const [orderIsFinished, setOrderIsFinished] = useState<any>(null)
  const closePopup = () => {
    setOrderIsFinished(null)
  }
  const handleTipChange = (percentage) => {
    setTipPercentage(percentage);
  };
  const emptyCart = () => {
    setCart([])
  }

  const validateOrder = async() => {
    if (submitLoading) {return}
    setSubmitLoading(true)
    // Check if the cart is empty
    const incomplete = []
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items to your cart before placing an order.");
      setSubmitLoading(false)
      return;
    }
  
    // Validate contact information
    if (!contactInfo.trim()) {
      incomplete.push('contact')
    }
  
    // Validate service type
    if (serviceType === "dineIn" && (!tableNumber || parseInt(tableNumber) <= 0)) {
      incomplete.push('tableNumber')
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
      setSubmitLoading(false)
      return;
    }
    // If all validations pass
    setOrderIsFinished(await handleAddOrder(cart, {serviceType, tableNumber, contactInfo, comments, tipPercentage} ))
    setSubmitLoading(false)
  };

  

  let cartPrice = 0
  return (
    <>
      <div className="flex w-full justify-center space-x-32 px-20">
        {/* pricing information */}
        <div className="px-5 flex justify-center mb-5">
          {/* form */}
          <div className='w-[300px] mx-[100px]'>
            <h1 className="text-xl text-green-800 mb-4">Order Details</h1>
            <div className="flex flex-col space-y-4">
              {/* Pickup or Table Service */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Service Type:</label>
                <select 
                  className="border border-gray-300 p-2 rounded w-full" 
                  name="serviceType" 
                  value={serviceType} 
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  <option value="pickup">Pickup</option>
                  <option value="dineIn">Dine In</option>
                </select>
              </div>

              {/* Table Number (conditional on dine-in) */}
              {serviceType === 'dineIn' && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Table Number:</label>
                  <input
                    type="number"
                    placeholder="Enter table number"
                    className={`border border-gray-300 p-2 rounded w-full ${
                      incompleteOptions.includes('tableNumber') ? "border-4 border-red-500 rounded p-2" : ""
                    }`}
                    min="1"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    ref={(el) => (optionRefs.current['tableNumber'] = el) as any}
                  />
                </div>
              )}

              {/* Contact Information */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Contact Information:</label>
                <input
                  type="text"
                  placeholder="Enter Contact Information"
                  className={`border border-gray-300 p-2 rounded w-full ${
                    incompleteOptions.includes('contact') ? "border-red-500 border-4 rounded p-2" : ""
                  }`}
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  ref={(el) => (optionRefs.current['contact'] = el) as any}
                />
              </div>

              {/* Tip Selection */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Tip:</label>
                <div className="flex space-x-4">
                  {[0, 0.1, 0.15, 0.2].map((percentage) => (
                    <button
                      key={percentage}
                      type="button"
                      className={`py-2 px-4 rounded transition-all ${
                        tipPercentage === percentage
                          ? 'bg-green-800 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => handleTipChange(percentage)}
                    >
                      {percentage==0 ? 'No Tip' : (percentage * 100)+"%"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Additional Comments:</label>
                <textarea
                  placeholder="Enter any special requests or comments"
                  className="border border-gray-300 p-2 rounded w-full"
                  rows={4}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                onClick={validateOrder}
              >
                {
                  submitLoading ? "Order is Being Placed....." :
                    "Place Order"
                }
              </button>
            </div>
        </div>
          
          <div className='mb-5'>
           <h1 className="text-xl text-green-800">Your Cart</h1>
           {/* items */}
           <div className='flex flex-col w-[400px]'>
            {cart.map((cartFood, i) => {
              cartPrice+=cartFood.data.price*cartFood.quantity
              return (
                <div 
                className='flex gap-2 border-b-2 py-1.5 px-2 transition-all w-full' key={i}>
                  <p className='text-xl text-gray-500'>{cartFood.quantity}</p>
                  <div className='flex flex-col w-full'>
                    <div className='flex justify-between w-full'>
                      <h3 className='font-medium text-black text-lg'>{cartFood.data.name}</h3>
                      <div className='flex'>
                        <h4 className='text-gray-500 text-sm'>{formatPrice(cartFood.data.price*cartFood.quantity)}</h4>
                      </div>
                    </div>
                    <p className='text-sm text-gray-500 p-1'>
                      {cartFood.data.desc}
                    </p>
                  </div>
                </div>
              )
            })}
            <div className='flex justify-between border-b-2 py-4 items-center px-2 transition-all w-full'>
              <h3 className='text-lg'>Cart Price: </h3>
              <h4 className='text-gray-500 text-sm'>{formatPrice(cartPrice)}</h4>
            </div>
            <div className='flex justify-between py-2 items-center px-2 transition-all w-full'>
              <h3 className=''>Tax: </h3>
              <h4 className='text-gray-500 text-sm'>{formatPrice(cartPrice*0.0825)}</h4>
            </div>
            <div className='flex justify-between border-b-2 py-2 items-center px-2 transition-all w-full'>
              <h3 className=''>Tip: </h3>
              <h4 className='text-gray-500 text-sm'>{formatPrice(cartPrice*tipPercentage)}({tipPercentage*100}%)</h4>
            </div>
            <div className='flex justify-between border-b-2 py-3 items-center px-2 transition-all w-full'>
              <h3 className=''>Total: </h3>
              <h4 className='text-gray-500 text-sm'>{ formatPrice( (Math.round(cartPrice*tipPercentage * 100)/100)+(Math.round(cartPrice*0.0825 * 100)/100)+cartPrice)}</h4>
            </div>
           </div>
          </div>
        </div>
      </div>
      <OrderPlacedPopup orderResponse={orderIsFinished} onClose={closePopup} emptyCart={emptyCart}/>
    </>
    
  )
}


const OrderPlacedPopup = ({ orderResponse, onClose, emptyCart }) => {
  const [orders, setOrders] = useAtom(ordersAtom)
  useEffect(() => {
    if (orderResponse != false && orderResponse != null) {
      emptyCart()
      console.log(orderResponse)
      setOrders([
        ...orders,
        orderResponse._id
      ])
      console.log(orders)
    }
  }, [orderResponse])

  if (orderResponse == null) {
    return "";
  }

  let content;
  if (orderResponse === false) {
    content = (
      <div className="flex flex-col items-center justify-center h-full text-red-600">
        <FaTimesCircle size={64} className="mb-4" />
        <h2 className="text-2xl font-bold">Something went wrong.</h2>
        <button
          className="bg-gray-600 text-white px-6 py-2 rounded-full mt-5 hover:bg-gray-700 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col items-center justify-center h-full text-green-600">
        <FaCheckCircle size={64} className="mb-4" />
        <h2 className="text-2xl font-bold">Order has been placed. It&apos;s on the house!</h2>
        <Link
          href={'/order'}
          className="bg-green-600 text-white px-6 py-2 rounded-full mt-5 hover:bg-green-700 transition"
        >
          Back to Order Page
        </Link>
      </div>
    );
  }

  return (
    <div
      className="mt-[85px] h-[calc(100vh-80px)] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[450px] h-[300px] relative"
      >
        {content}
      </div>
    </div>
  );
};

export default CheckoutInfo