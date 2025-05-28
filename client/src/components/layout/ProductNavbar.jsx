import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown, FaBars, FaCheck, FaShoppingBag, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getMegaMenu } from "../../redux/slices/ariseSlice";
import MegaMenu from "./MegaMenu";

const ProductNavbar = ({ userId }) => {
  const { logo, menuItems } = useSelector((state) => state.arise);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems || []);

  useEffect(() => {
    dispatch(getMegaMenu());
  }, [dispatch]);

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => {
    setNavbarOpen(false);
    setMegaOpen(false);
  };

  // Fallback to localStorage if userId prop is not provided
  const effectiveUserId = userId || localStorage.getItem("userId");

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-3xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={closeNavbar} className="flex items-center">
          <img src={logo || "/default-logo.png"} alt="Logo" className="w-40" />
        </Link>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-gray-800" onClick={toggleNavbar}>
          {navbarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navbar Links */}
        <div
          className={`lg:flex lg:items-center absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none p-4 lg:p-0 transition-all duration-300 ${
            navbarOpen ? "block" : "hidden"
          }`}
        >
          <ul className="lg:flex items-center gap-6 space-y-4 lg:space-y-0 pl-0">
            {menuItems.find((item) => item.megaMenu) && (
              <li className="relative mr-4">
                <button
                  onClick={() => setMegaOpen(!megaOpen)}
                  className="flex items-center text-gray-800 font-semibold text-lg px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  Our Products <FaAngleDown className="ml-2" />
                </button>

                {/* Mega Menu Dropdown */}
                <MegaMenu
                  megaOpen={megaOpen}
                  setMegaOpen={setMegaOpen}
                  megaMenu={menuItems.find((item) => item.megaMenu)?.megaMenu}
                />
              </li>
            )}
          </ul>

          {/* Orders Icon */}
          <Link
            to={`/orders/${effectiveUserId}`}
            onClick={closeNavbar}
            className="flex items-center text-gray-800 font-semibold text-lg px-4 py-2 bg-gray-200 rounded w-20 hover:bg-gray-300 transition mr-3 mb-3 relative"
          >
            <div className="relative w-6 h-6">
              <FaShoppingBag className="w-full h-full" />
              <FaCheck className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-600" />
            </div>
          </Link>

          {/* Cart Button */}
          <Link
            to="/cart"
            className="flex items-center text-gray-800 font-semibold text-lg px-4 py-2 bg-gray-200 w-20 rounded hover:bg-gray-300 transition mb-3 mr-4"
            onClick={closeNavbar}
          >
            <FaShoppingCart className="mr-2" size={26} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Book Appointment */}
          <Link
            to="/appointmentPage"
            className="btn btn-info rounded-pill text-white text-2xl px-4 py-2 mr-3 mb-2 font-bold mt-[-10px]"
            onClick={closeNavbar}
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default ProductNavbar;