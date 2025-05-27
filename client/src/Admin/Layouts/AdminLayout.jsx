import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { BlogProvider } from "../context/BlogProvider";

const AdminLayout = () => {
  const token = localStorage.getItem("adminToken"); // Get token

  const isAuthenticated = token !== null; // Check if token exists

  if (!isAuthenticated) {
    return <Navigate to="/expert/login" replace />; // Redirect if not logged in
  }

  return (
    <BlogProvider>
      <Outlet />
    </BlogProvider>
  );
};

export default AdminLayout;
