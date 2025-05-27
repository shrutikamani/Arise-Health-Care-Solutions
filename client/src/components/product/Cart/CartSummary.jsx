import React from "react";
import { Link } from "react-router-dom";

const PriceSummary = ({ subtotal, cartItems }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">PRICE DETAILS</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-xl">
          <span>Price</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl">
          <span>Delivery Charges</span>
          <span className="text-xl text-green-600">Free</span>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between font-bold text-xl">
        <span>Total Amount</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      <Link
        to="/Login"
        className="mt-6 block text-center w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 text-xl"
      >
        PLACE ORDER
      </Link>
    </div>
  );
};

export default PriceSummary;
