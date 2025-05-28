// import React from "react";
// import { Outlet, Navigate } from "react-router-dom";
// import { BlogProvider } from "../context/BlogProvider"; // ✅ Correct named import

// const AdminLayout = () => {
//   const isAuthenticated = true; // Replace with actual authentication logic

//   if (!isAuthenticated) {
//     return <Navigate to="/expert/login" replace />;
//   }

//   return (
//     <BlogProvider> {/* ✅ Wrap all routes inside the provider */}
//       <Outlet />
//     </BlogProvider>
//   );
// };

// export default AdminLayout;


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
