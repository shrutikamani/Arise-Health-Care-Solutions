  // import React, { useState, useEffect } from "react";
  // import { Link, useNavigate } from "react-router-dom";
  // import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
  // import { useSelector, useDispatch } from "react-redux";
  // import { getMegaMenu } from "../../redux/slices/ariseSlice";
  // import MegaMenu from "./MegaMenu";

  // const Navbar = () => {
  //   const dispatch = useDispatch();
  //   const { logo, menuItems, megaMenuStatus, megaMenuError } = useSelector(
  //     (state) => state.arise
  //   );
  //   const [navbarOpen, setNavbarOpen] = useState(false);
  //   const [sticky, setSticky] = useState(false);
  //   const [megaOpen, setMegaOpen] = useState(false);

  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     dispatch(getMegaMenu());
  //   }, [dispatch]);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       setSticky(window.scrollY > 35);
  //       if (megaOpen && window.scrollY > 35) {
  //         setMegaOpen(false);
  //       }
  //     };
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, [megaOpen]);

  //   const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  //   const closeNavbar = () => {
  //     setNavbarOpen(false);
  //     setMegaOpen(false);
  //   };

  //   const megaMenu = menuItems.find((item) => item.megaMenu)?.megaMenu || [];

  //   return (
  //     <nav
  //       className={`bg-white shadow-md ${
  //         sticky ? "fixed top-0 left-0 w-full z-50" : ""
  //       }`}
  //     >
  //       <div className="max-w-screen-3xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
  //         <Link to="/" onClick={closeNavbar} className="flex items-center">
  //           <img src={logo} alt="Logo" className="w-40" />
  //         </Link>

  //         <button className="lg:hidden text-gray-800" onClick={toggleNavbar}>
  //           {navbarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
  //         </button>

  //         <div
  //           className={`lg:flex lg:items-center absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none p-4 lg:p-0 transition-all duration-300 ${
  //             navbarOpen ? "block" : "hidden"
  //           }`}
  //         >
  //           <ul className="lg:flex items-center gap-6 space-y-4 lg:space-y-0">
  //             {megaMenuStatus === "loading" && <li>Loading menu...</li>}
  //             {megaMenuError && <li>Error: {megaMenuError}</li>}
  //             {menuItems
  //               .filter((item) => !item.megaMenu)
  //               .map((item, index) => (
  //                 <li key={index}>
  //                   <Link
  //                     to={item.path}
  //                     onClick={closeNavbar}
  //                     className="relative text-gray-800 font-medium text-2xl hover:text-blue-600 transition duration-200 group"
  //                   >
  //                     {item.name}
  //                     <span className="absolute left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full bottom-[-4px]"></span>
  //                   </Link>
  //                 </li>
  //               ))}

  //             {/* Mega Menu Trigger */}
  //             {megaMenu.length > 0 && (
  //               <li className="relative mr-4">
  //                 <button
  //                   onClick={() => setMegaOpen(!megaOpen)}
  //                   className="flex items-center text-gray-800 font-semibold text-lg px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
  //                 >
  //                   Our Products <FaAngleDown className="ml-2" />
  //                 </button>
  //               </li>
  //             )}
  //           </ul>

  //           <Link
  //             to="/appointmentPage"
  //             className="btn btn-info rounded-pill text-white text-2xl px-4 py-2 mr-3 mb-2 font-bold mt-[-10px]"
  //             onClick={closeNavbar}
  //           >
  //             Book Appointment
  //           </Link>
  //         </div>
  //       </div>

  //       {/* Mega Menu Render */}
  //       {megaMenu.length > 0 && (
  //         <MegaMenu
  //           megaOpen={megaOpen}
  //           setMegaOpen={setMegaOpen}
  //           megaMenu={megaMenu}
  //         />
  //       )}
  //     </nav>
  //   );
  // };

  // export default Navbar;

  import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getMegaMenu } from "../../redux/slices/ariseSlice";
import MegaMenu from "./MegaMenu";

const Navbar = () => {
  const dispatch = useDispatch();
  const { logo, menuItems, megaMenuStatus, megaMenuError } = useSelector(
    (state) => state.arise
  );
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMegaMenu());
  }, [dispatch]);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => {
    setNavbarOpen(false);
    setMegaOpen(false);
  };

  const megaMenu = menuItems.find((item) => item.megaMenu)?.megaMenu || [];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-3xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" onClick={closeNavbar} className="flex items-center">
          <img src={logo} alt="Logo" className="w-40" />
        </Link>

        <button className="lg:hidden text-gray-800" onClick={toggleNavbar}>
          {navbarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <div
          className={`lg:flex lg:items-center absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none p-4 lg:p-0 transition-all duration-300 ${
            navbarOpen ? "block" : "hidden"
          }`}
        >
          <ul className="lg:flex items-center gap-6 space-y-4 lg:space-y-0">
            {megaMenuStatus === "loading" && <li>Loading menu...</li>}
            {megaMenuError && <li>Error: {megaMenuError}</li>}
            {menuItems
              .filter((item) => !item.megaMenu)
              .map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    onClick={closeNavbar}
                    className="relative text-gray-800 font-medium text-2xl hover:text-blue-600 transition duration-200 group"
                  >
                    {item.name}
                    <span className="absolute left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full bottom-[-4px]"></span>
                  </Link>
                </li>
              ))}

            {/* Mega Menu Trigger */}
            {megaMenu.length > 0 && (
              <li className="relative mr-4">
                <button
                  onClick={() => setMegaOpen(!megaOpen)}
                  className="flex items-center text-gray-800 font-semibold text-lg px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  Our Products <FaAngleDown className="ml-2" />
                </button>
              </li>
            )}
          </ul>

          <Link
            to="/appointmentPage"
            className="btn btn-info rounded-pill text-white text-2xl px-4 py-2 mr-3 mb-2 font-bold mt-[-10px]"
            onClick={closeNavbar}
          >
            Book Appointment
          </Link>
        </div>
      </div>

      {/* Mega Menu Render */}
      {megaMenu.length > 0 && (
        <MegaMenu
          megaOpen={megaOpen}
          setMegaOpen={setMegaOpen}
          megaMenu={megaMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;