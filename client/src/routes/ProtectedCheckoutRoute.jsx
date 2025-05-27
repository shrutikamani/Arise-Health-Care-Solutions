import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedCheckoutRoute = ({ children }) => {
  const shippingAddress = useSelector((state) => state.order.shippingAddress);

  if (!shippingAddress || !shippingAddress.fullName) {
    return <Navigate to="/checkout" replace />;
  }

  return children;
};

export default ProtectedCheckoutRoute;
