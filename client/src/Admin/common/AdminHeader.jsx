// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// // import { setSearchTerm } from "../../redux/slices/Search-slice/searchSlice";

// const AdminHeader = ({ isOpen, setIsOpen, pageTitle }) => {
//   const location = useLocation();
//   const dispatch = useDispatch();

//   // const [searchActive, setSearchActive] = useState(false);
//   // const [searchValue, setSearchValue] = useState("");

//   const currentPath =
//     location.pathname.split("/").filter(Boolean).pop() || "dashboard";

//   // const handleSearch = () => {
//   //   if (searchValue.trim()) {
//   //     dispatch(
//   //       setSearchTerm({
//   //         term: searchValue.trim(),
//   //         location: currentPath,
//   //       })
//   //     );
//   //   }
//   // };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") handleSearch();
//   };

//   return (
//     <div className="bg-white border-b-2 border-gray-300 fixed top-0 left-0 w-full h-20 flex items-center px-6 shadow-md z-50">
//       {/* Sidebar Toggle Button */}
//       <button
//         className="bg-gray-200 text-gray-700 p-2 rounded shadow-md transition-transform duration-300 flex items-center mr-4"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <FaTimes /> : <FaBars />}
//       </button>

//       {/* Page Title */}
//       <h1 className="text-4xl font-semibold text-gray-800 capitalize">
//         {pageTitle?.replace("-", " ")}
//       </h1>

//       {/* Search Box */}
//       {/* <div
//         className={`ml-6 relative bg-black h-[50px] rounded-full px-4 flex items-center transition-all duration-500 overflow-hidden ${
//           searchActive ? "w-[300px]" : "w-[50px]"
//         }`}
//         onMouseEnter={() => setSearchActive(true)}
//         onMouseLeave={() => !searchValue && setSearchActive(false)}
//       >
//         <input
//           type="text"
//           className={`bg-transparent border-none outline-none text-white placeholder-white text-lg transition-all duration-500 ${
//             searchActive ? "w-full px-2" : "w-0"
//           }`}
//           placeholder="Search"
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//           onKeyDown={handleKeyDown}
//         />
//         <button
//           className="text-white flex items-center justify-center w-[40px] h-[40px] rounded-full"
//           onClick={handleSearch}
//         >
//           <FaSearch className="text-xl" />
//         </button>
//       </div> */}

//       {/* Breadcrumb Navigation */}
//       <nav className="ml-auto text-xl text-gray-500">
//         <Link to="/expert/dashboard" className="text-blue-600 hover:underline">
//           Dashboard
//         </Link>{" "}
//         / <span className="text-gray-600 capitalize">{currentPath}</span>
//       </nav>
//     </div>
//   );
// };

// export default AdminHeader;

// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// // import { setSearchTerm } from "../../redux/slices/Search-slice/searchSlice";

// const AdminHeader = ({ isOpen, setIsOpen, pageTitle }) => {
//   const location = useLocation();
//   const dispatch = useDispatch();

//   // const [searchActive, setSearchActive] = useState(false);
//   // const [searchValue, setSearchValue] = useState("");

//   const currentPath =
//     location.pathname.split("/").filter(Boolean).pop() || "dashboard";

//   // const handleSearch = () => {
//   //   if (searchValue.trim()) {
//   //     dispatch(
//   //       setSearchTerm({
//   //         term: searchValue.trim(),
//   //         location: currentPath,
//   //       })
//   //     );
//   //   }
//   // };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") handleSearch();
//   };

//   return (
//     <div className="bg-gradient-to-r from-[#FF9933] to-[#FF6600] border-b-2 border-[#CC5200] fixed top-0 left-0 w-full h-20 flex items-center px-6 shadow-lg z-50">
//       {/* Sidebar Toggle Button */}
//       <button
//         className="bg-[#FFCC99] text-[#4A2F00] p-2 rounded shadow-md hover:bg-[#FFB266] transition-transform duration-300 flex items-center mr-4"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <FaTimes /> : <FaBars />}
//       </button>

//       {/* Page Title */}
//       <h1 className="text-4xl font-semibold text-white capitalize">
//         {pageTitle?.replace("-", " ")}
//       </h1>

//       {/* Search Box (Uncomment and style if needed) */}
//       {/* <div
//         className={`ml-6 relative bg-[#4A2F00] h-[50px] rounded-full px-4 flex items-center transition-all duration-500 overflow-hidden ${
//           searchActive ? "w-[300px]" : "w-[50px]"
//         }`}
//         onMouseEnter={() => setSearchActive(true)}
//         onMouseLeave={() => !searchValue && setSearchActive(false)}
//       >
//         <input
//           type="text"
//           className={`bg-transparent border-none outline-none text-white placeholder-[#FFCC99] text-lg transition-all duration-500 ${
//             searchActive ? "w-full px-2" : "w-0"
//           }`}
//           placeholder="Search"
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//           onKeyDown={handleKeyDown}
//         />
//         <button
//           className="text-white flex items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-[#FFCC99] hover:text-[#4A2F00]"
//           onClick={handleSearch}
//         >
//           <FaSearch className="text-xl" />
//         </button>
//       </div> */}

//       {/* Breadcrumb Navigation */}
//       <nav className="ml-auto text-xl text-[#FFCC99]">
//         <Link
//           to="/expert/dashboard"
//           className="text-white hover:text-[#FFB266] hover:underline"
//         >
//           Dashboard
//         </Link>{" "}
//         / <span className="text-white capitalize">{currentPath}</span>
//       </nav>
//     </div>
//   );
// };

// export default AdminHeader;


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