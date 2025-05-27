  import React, { useState } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import {
    setShippingAddress,
    setCartItems,
    setTotalAmount,
    setUserId,
  } from "../../../redux/slices/Order-slice/orderSlice";
  import {
    increaseQty,
    decreaseQty,
    removeFromCart,
  } from "../../../redux/slices/Product-slice/cartSlice";
  import { useNavigate } from "react-router-dom";

  const OrderSummary = () => {
    const cartItems = useSelector((state) => state.cart?.items || []);
    const shippingAddress = useSelector((state) => state.order?.shippingAddress || {});
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleProceedToCheckout = () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        navigate(`/checkout?userId=${userId}`);
      } else {
        alert("User ID not found");
      }
    };

    if (!cartItems.length) {
      return (
        <div className="bg-gray-100 h-auto py-10 text-center text-gray-600 text-lg">
          Your cart is empty.
        </div>
      );
    }

    return (
      <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Order Summary</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src={
                      item.images?.[0]?.startsWith("http")
                        ? item.images[0]
                        : `http://localhost:3030${item.images?.[0] || "/placeholder.jpg"}`
                    }
                    alt={item.title}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch(increaseQty(item._id))}
                      className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-md"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(decreaseQty(item._id))}
                      className="p-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 rounded-md"
                    >
                      -
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Details */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-700">Shipping Address</h2>
                {Object.keys(shippingAddress).length > 0 ? (
                  <div className="mt-2 text-gray-600">
                    <p><strong>Name:</strong> {shippingAddress.fullName}</p>
                    <p><strong>Address:</strong> {shippingAddress.address}</p>
                    <p><strong>City:</strong> {shippingAddress.city}</p>
                    <p><strong>State:</strong> {shippingAddress.state}</p>
                    <p><strong>Pincode:</strong> {shippingAddress.pincode}</p>
                    <p><strong>Phone:</strong> {shippingAddress.phoneNumber}</p>
                  </div>
                ) : (
                  <p className="text-gray-600 mt-2">No shipping address provided</p>
                )}
              </div>
              <div className="border-t pt-4">
                <h2 className="text-xl font-semibold text-gray-700">Order Summary</h2>
                <div className="mt-2 text-gray-600">
                  <p>Total Items: {totalQty}</p>
                  <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
                </div>
                <button
                  onClick={handleProceedToCheckout}
                  className="mt-4 w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default OrderSummary;