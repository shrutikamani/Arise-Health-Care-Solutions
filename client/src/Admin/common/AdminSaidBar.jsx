import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBlog,
  FaClipboardList,
  FaListAlt,
  FaFolderOpen,
  FaHourglassHalf,
  FaBan,
  FaCheckCircle,
  FaSignOutAlt,
  FaAngleDown,
  FaBox,
  FaPlusCircle,
  FaTools,
  FaCog,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { MdKeyboardArrowRight, MdAdminPanelSettings } from "react-icons/md";
import AdminHeader from "./AdminHeader";

const AdminNavbar = () => {
  const [productsOpen, setProductsOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [allInquiryOpen, setAllInquiryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/expert/login");
  };

  return (
    <>   
     <AdminHeader/>
    <nav className="bg-white mt-20 text-[#FF9933] fixed top-0 left-0 z-40 shadow-lg w-full h-16 flex items-center px-4">
      {/* Navbar Logo */}
      <div className="flex items-center mr-6 border-r border-[#CC5200] pr-4">
        <MdAdminPanelSettings className="text-3xl text-[#FF9933]" />
        <span className="ml-2 text-2xl font-bold">Admin Panel</span>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center space-x-8 text-[22px] font-bold">
        <NavLink
          to="/expert/dashboard"
          className="flex items-center p-2  bg-[#FF6600] text-white rounded hover:bg-[#FFCC99] border-r border-[#CC5200]"
        >
          <FaTachometerAlt className="mr-2" /> Dashboard
        </NavLink>

        {/* Products Menu */}
        <div className="relative">
          <button
            className="flex items-center p-2 hover:bg-[#FF6600] hover:text-white rounded text-[#FF9933] border-r border-[#CC5200]"
            onClick={() => setProductsOpen(!productsOpen)}
          >
            <FaBox className="mr-2" /> Products
            <FaAngleDown
              className={`ml-2 transition-transform ${productsOpen ? "rotate-180" : ""}`}
            />
          </button>
          {productsOpen && (
            <div className="absolute top-full left-0 bg-white shadow-lg rounded mt-1 flex flex-col">
              <NavLink
                to="/expert/products/create"
                className="p-2 text-[#FF9933] hover:text-white hover:bg-[#FF6600] rounded border-b border-[#CC5200]"
              >
                <FaPlusCircle className="inline-block mr-2" /> Add Products
              </NavLink>
              <NavLink
                to="/expert/products/questions"
                className="p-2 text-[#FF9933] hover:text-white hover:bg-[#FF6600] rounded border-b border-[#CC5200]"
              >
                <FaRegQuestionCircle className="inline-block mr-2" /> Products Questions
              </NavLink>
            </div>
          )}
        </div>

        {/* Inquiry Menu */}
        <div className="relative">
          <button
            className="flex items-center p-2 hover:bg-[#FF6600] hover:text-white rounded text-[#FF9933] border-r border-[#CC5200]"
            onClick={() => setInquiryOpen(!inquiryOpen)}
          >
            <FaClipboardList className="mr-2" /> Inquiry
            <FaAngleDown
              className={`ml-2 transition-transform ${inquiryOpen ? "rotate-180" : ""}`}
            />
          </button>
          {inquiryOpen && (
            <div className="absolute top-full left-0 bg-white shadow-lg rounded mt-1 flex flex-col">
              <div className="relative">
                <button
                  className="flex items-center p-2 w-full text-left hover:bg-[#FF6600] hover:text-white rounded text-[#FF9933] border-b border-[#CC5200]"
                  onClick={() => setAllInquiryOpen(!allInquiryOpen)}
                >
                  <FaListAlt className="mr-2" /> All Inquiries
                  <MdKeyboardArrowRight
                    className={`ml-2 transition-transform ${allInquiryOpen ? "rotate-90" : ""}`}
                  />
                </button>
                {allInquiryOpen && (
                  <div className="ml-4 flex flex-col">
                    <NavLink
                      to="/expert/inquiry/all"
                      className="p-2 text-[#FF9933] hover:text-white hover:bg-[#FF6600] rounded border-b border-[#CC5200]"
                    >
                      <FaListAlt className="inline-block mr-2" /> View All
                    </NavLink>
                    <NavLink
                      to="/expert/inquiry/all-open"
                      className="p-2 text-[#FF9933] hover:text-white hover:bg-[#FF6600] rounded border-b border-[#CC5200]"
                    >
                      <FaFolderOpen className="inline-block mr-2" /> Open Inquiries
                    </NavLink>
                    <NavLink
                      to="/expert/inquiry/all-pending"
                      className="p-2 text-[#FF9933] hover:text-white hover:bg-[#FF6600] rounded border-b border-[#CC5200]"
                    >
                      <FaHourglassHalf className="inline-block mr-2" /> Pending Inquiries
                    </NavLink>
                  </div>
                )}
              </div>
              <NavLink
                to="/expert/inquiry/terminated"
                className="p-2 text-[#FF9933] hover:bg-[#FF6600] hover:text-white rounded border-b border-[#CC5200]"
              >
                <FaBan className="inline-block mr-2" /> Terminated Inquiry
              </NavLink>
              <NavLink
                to="/expert/inquiry/closed"
                className="p-2 text-[#FF9933] hover:bg-[#FF6600] hover:text-white rounded border-b border-[#CC5200]"
              >
                <FaCheckCircle className="inline-block mr-2" /> Closed Inquiry
              </NavLink>
            </div>
          )}
        </div>

        {/* Blog Menu */}
        <NavLink
          to="/expert/blog"
          className="flex items-center p-2 text-[#FF9933] hover:bg-[#FF6600] hover:text-white rounded border-r border-[#CC5200]"
        >
          <FaBlog className="inline-block mr-2" /> Manage Blogs
        </NavLink>

        {/* Features Menu */}
        <NavLink
          to="/expert/features"
          className="flex items-center p-2 text-[#FF9933] hover:bg-[#FF6600] hover:text-white rounded border-r border-[#CC5200]"
        >
          <FaTools className="inline-block mr-2" /> Features
        </NavLink>

        {/* Orders Menu */}
        <NavLink
          to="/expert/orders"
          className="flex items-center p-2 text-[#FF9933] hover:bg-[#FF6600] hover:text-white rounded border-r border-[#CC5200]"
        >
          <FaListAlt className="inline-block mr-2" /> Orders
        </NavLink>

        {/* Settings Menu */}
        <div className="relative">
          <button
            className="flex items-center p-2 hover:bg-[#FF6600] hover:text-white rounded text-[#FF9933] border-r border-[#CC5200]"
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <FaCog className="mr-2" /> Settings
            <FaAngleDown
              className={`ml-2 transition-transform ${settingsOpen ? "rotate-180" : ""}`}
            />
          </button>
          {settingsOpen && (
            <div className="absolute top-full left-0 bg-white shadow-lg rounded mt-1 flex flex-col">
              <NavLink
                to="/expert/settings/mega-menu"
                className="p-2 text-[#FF9933] hover:text-white hover:bg-[#FF6600] rounded border-b border-[#CC5200]"
              >
                <FaListAlt className="inline-block mr-2" /> Manage Mega Menu
              </NavLink>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center p-2 bg-white text-[#FF9933] font-bold hover:bg-[#FFCC99] rounded border-r border-[#CC5200]"
        >
          <FaSignOutAlt className="mr-2" />Logout
        </button>
      </div>
    </nav>
    </>

  );
};

export default AdminNavbar;