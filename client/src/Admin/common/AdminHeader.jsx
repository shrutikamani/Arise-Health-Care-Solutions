import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";

const AdminHeader = ({ isOpen, setIsOpen, pageTitle }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const currentPath =
    location.pathname.split("/").filter(Boolean).pop() || "dashboard";

  return (
    <div className="bg-gradient-to-r from-[#FF9933] to-[#FF6600] border-b-2 border-[#CC5200] fixed top-0 left-0 w-full h-20 flex items-center px-6 shadow-lg z-50">
      {/* Sidebar Toggle Button (Optional, can be removed if using AdminNavbar) */}
      {/* <button
        className="bg-[#FFCC99] text-[#4A2F00] p-2 rounded shadow-md hover:bg-[#FFB266] transition-transform duration-300 flex items-center mr-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button> */}

      {/* Page Title */}
      <h1 className="text-4xl font-semibold text-white capitalize">
        {pageTitle?.replace("-", " ")}
      </h1>

      {/* Breadcrumb Navigation */}
      <nav className="ml-auto text-xl text-[#FFCC99]">
        <Link
          to="/expert/dashboard"
          className="text-white hover:text-[#FFB266] hover:underline"
        >
          Dashboard
        </Link>{" "}
        / <span className="text-white capitalize">{currentPath}</span>
      </nav>
    </div>
  );
};

export default AdminHeader;