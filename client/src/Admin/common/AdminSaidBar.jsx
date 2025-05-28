// import React, { useState, useEffect, useRef } from "react"; // Added useRef
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaBlog,
//   FaClipboardList,
//   FaListAlt,
//   FaFolderOpen,
//   FaHourglassHalf,
//   FaBan,
//   FaCheckCircle,
//   FaSignOutAlt,
//   FaAngleDown,
//   FaBox,
//   FaPlusCircle,
//   FaTools,
//   FaCog,
//   FaRegQuestionCircle,
// } from "react-icons/fa";
// import { MdKeyboardArrowRight, MdAdminPanelSettings } from "react-icons/md";
// import AdminHeader from "./AdminHeader";

// const AdminSidebar = () => {
//   const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
//   const [productsOpen, setProductsOpen] = useState(false);
//   const [inquiryOpen, setInquiryOpen] = useState(false);
//   const [allInquiryOpen, setAllInquiryOpen] = useState(false);
//   const [settingsOpen, setSettingsOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const sidebarRef = useRef(null); // Added ref for sidebar

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 1024) {
//         setIsOpen(false);
//       } else {
//         setIsOpen(true);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (window.innerWidth < 1024) {
//       setIsOpen(false);
//     }
//   }, [location.pathname]);

//   // Added handleClickOutside logic
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target) &&
//         window.innerWidth >= 1024
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/expert/login");
//   };

//   const pageTitles = {
//     "/expert/dashboard": "Dashboard",
//     "/expert/blog": "Manage Blogs",
//     "/expert/inquiry/all": "All Inquiries",
//     "/expert/inquiry/all-open": "Open Inquiries",
//     "/expert/inquiry/all-pending": "Pending Inquiries",
//     "/expert/inquiry/terminated": "Terminated Inquiry",
//     "/expert/inquiry/closed": "Closed Inquiry",
//     "/expert/products/create": "Add Products",
//     "/expert/features": "Features",
//     "/expert/orders": "Orders",
//     "/expert/products/questions": "Products Questions",
//     "/expert/settings/mega-menu": "Manage Mega Menu",
//   };

//   const currentPage = pageTitles[location.pathname] || "Dashboard";

//   return (
//     <>
//       <AdminHeader
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//         pageTitle={currentPage}
//       />

//       <div
//         ref={sidebarRef} // Added ref to sidebar
//         className={`bg-white text-[#FF9933] fixed top-16 left-0 z-40 shadow-lg transition-all duration-300 lg:w-72 w-full h-[calc(100vh-4rem)] ${
//           isOpen
//             ? "translate-x-0 opacity-100"
//             : "-translate-x-full lg:-translate-x-0 opacity-0 pointer-events-none"
//         } flex flex-col`}
//       >
//         {/* Sidebar Logo */}
//         <div className="flex items-center mt-4 px-4 py-3 border-b border-[#CC5200]">
//           <MdAdminPanelSettings className="text-3xl text-[#FF9933]" />
//           <span className="ml-2 text-4xl font-bold">Admin Panel</span>
//         </div>

//         {/* Scrollable Navigation */}
//         <div className="mt-6 space-y-4 text-xl px-2 overflow-y-auto flex-1">
//           <NavLink
//             to="/expert/dashboard"
//             className="block p-2.5 bg-[#FF6600] text-white rounded transition hover:bg-[#FFCC99]"
//           >
//             <FaTachometerAlt className="inline-block mr-2" />{" "}
//             {isOpen && "Dashboard"}
//           </NavLink>

//           {/* Products Menu */}
//           <div>
//             <button
//               className="w-full flex items-center p-2.5 hover:bg-[#FF6600] hover:text-white hover:text-white transition rounded text-[#FF9933]"
//               onClick={() => setProductsOpen(!productsOpen)}
//             >
//               <FaBox />
//               {isOpen && <span className="ml-2">Products</span>}
//               {isOpen && (  
//                 <FaAngleDown
//                   className={`ml-auto transition-transform ${
//                     productsOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               )}
//             </button>
//             {productsOpen && isOpen && (
//               <div className="ml-6 mt-2 space-y-2">
//                 <NavLink
//                   to="/expert/products/create"
//                   className="block p-2.5 text-[#FF9933] hover:text-white hover:bg-[#FF6600] hover:text-white transition rounded"
//                 >
//                   <FaPlusCircle className="inline-block mr-2" /> Add Products
//                 </NavLink>
//                 <NavLink
//                   to="/expert/products/questions"
//                   className="block p-2.5 text-[#FF9933] hover:text-white hover:bg-[#FF6600] hover:text-white transition rounded"
//                 >
//                   <FaRegQuestionCircle className="inline-block mr-2" /> Products
//                   Questions
//                 </NavLink>
//               </div>
//             )}
//           </div>

//           {/* Inquiry Menu */}
//           <div>
//             <button
//               className="w-full flex items-center p-2.5 hover:bg-[#FF6600] hover:text-white transition rounded text-[#FF9933]"
//               onClick={() => setInquiryOpen(!inquiryOpen)}
//             >
//               <FaClipboardList />
//               {isOpen && <span className="ml-2">Inquiry</span>}
//               {isOpen && (
//                 <FaAngleDown
//                   className={`ml-auto transition-transform ${
//                     inquiryOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               )}
//             </button>
//             {inquiryOpen && isOpen && (
//               <div className="ml-6 mt-2 space-y-2">
//                 <div>
//                   <button
//                     className="w-full flex items-center p-2.5 hover:bg-[#FF6600] hover:text-white transition rounded text-[#FF9933]"
//                     onClick={() => setAllInquiryOpen(!allInquiryOpen)}
//                   >
//                     <FaListAlt />
//                     {isOpen && (
//                       <>
//                         <span className="ml-2">All Inquiries</span>
//                         <MdKeyboardArrowRight
//                           className={`ml-auto transition-transform ${
//                             allInquiryOpen ? "rotate-90" : ""
//                           }`}
//                         />
//                       </>
//                     )}
//                   </button>
//                   {allInquiryOpen && (
//                     <div className="ml-6 mt-2 space-y-2">
//                       <NavLink
//                         to="/expert/inquiry/all"
//                         className="block p-2 text-[#FF9933] hover:text-white hover:bg-[#FF6600] hover:text-white transition rounded"
//                       >
//                         <FaListAlt className="inline-block mr-2" /> View All
//                       </NavLink>
//                       <NavLink
//                         to="/expert/inquiry/all-open"
//                         className="block p-2 text-[#FF9933] hover:text-white hover:bg-[#FF6600] hover:text-white transition rounded"
//                       >
//                         <FaFolderOpen className="inline-block mr-2" /> Open
//                         Inquiries
//                       </NavLink>
//                       <NavLink
//                         to="/expert/inquiry/all-pending"
//                         className="block p-2 text-[#FF9933] hover:text-white hover:bg-[#FF6600] hover:text-white transition rounded"
//                       >
//                         <FaHourglassHalf className="inline-block mr-2" />{" "}
//                         Pending Inquiries
//                       </NavLink>
//                     </div>
//                   )}
//                 </div>
//                 <NavLink
//                   to="/expert/inquiry/terminated"
//                   className="block p-2 text-[#FF9933] hover:bg-[#FF6600] hover:text-white transition rounded"
//                 >
//                   <FaBan className="inline-block mr-2" /> Terminated Inquiry
//                 </NavLink>
//                 <NavLink
//                   to="/expert/inquiry/closed"
//                   className="block p-2 text-[#FF9933] hover:bg-[#FF6600] hover:text-white transition rounded"
//                 >
//                   <FaCheckCircle className="inline-block mr-2" /> Closed Inquiry
//                 </NavLink>
//               </div>
//             )}
//           </div>

//           {/* Blog Menu */}
//           <NavLink
//             to="/expert/blog"
//             className="block p-2.5 text-[#FF9933] hover:bg-[#FF6600] hover:text-white rounded transition"
//           >
//             <FaBlog className="inline-block mr-2" /> {isOpen && "Manage Blogs"}
//           </NavLink>

//           {/* Features Menu */}
//           <NavLink
//             to="/expert/features"
//             className="block p-2.5 text-[#FF9933] hover:bg-[#FF6600] hover:text-white rounded transition"
//           >
//             <FaTools className="inline-block mr-2" /> {isOpen && "Features"}
//           </NavLink>

//           {/* Orders Menu */}
//           <NavLink
//             to="/expert/orders"
//             className="block p-2.5 text-[#FF9933] hover:bg-[#FF6600] hover:text-white rounded transition"
//           >
//             <FaListAlt className="inline-block mr-2" /> {isOpen && "Orders"}
//           </NavLink>

//           {/* Settings Menu */}
//           <div>
//             <button
//               className="w-full flex items-center p-2.5 hover:bg-[#FF6600] hover:text-white transition rounded text-[#FF9933]"
//               onClick={() => setSettingsOpen(!settingsOpen)}
//             >
//               <FaCog />
//               {isOpen && <span className="ml-2">Settings</span>}
//               {isOpen && (
//                 <FaAngleDown
//                   className={`ml-auto transition-transform ${
//                     settingsOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               )}
//             </button>
//             {settingsOpen && isOpen && (
//               <div className="ml-6 mt-2 space-y-2">
//                 <NavLink
//                   to="/expert/settings/mega-menu"
//                   className="block p-2.5 text-[#FF9933] hover:text-white hover:bg-[#FF6600] hover:text-white transition rounded"
//                 >
//                   <FaListAlt className="inline-block mr-2" /> Manage Mega Menu
//                 </NavLink>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Logout */}
//         <div className="w-full px-4 py-4 border-t border-[#CC5200]">
//           <button
//             onClick={handleLogout}
//             className="bg-white text-[#FF9933] w-full py-2 flex items-center justify-center text-lg font-bold hover:bg-[#FFCC99] transition"
//           >
//             <FaSignOutAlt className="text-[#FF9933]" />{" "}
//             {isOpen && <span className="ml-2">Logout</span>}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminSidebar;


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