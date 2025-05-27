import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className=" flex flex-col justify-center items-center bg-green-50 text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 Order Placed Successfully!</h1>
      <p className="text-gray-700 mb-6">Thank you for shopping with us.</p>
      <Link to="/" className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-500">
        Back to Home
      </Link>
    </div>  
  );
};

export default OrderSuccess;
