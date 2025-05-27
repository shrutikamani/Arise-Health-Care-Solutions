import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("adminToken"); // ✅ Get token

  if (!token) {
    return <Navigate to="/expert/login" replace />;
  }

  return <Outlet />; // ✅ Render protected components
};

export default AdminRoute;
