import React from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaAngleRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      {/* Footer Start */}
      <div className="relative  bg-[#01345B] py-14 overflow-hidden">
        {/* Bubble Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-5 left-5 w-6 h-6 bg-blue-900 opacity-30 rounded-full"></div> 
          <div className="absolute top-5 left-5 w-6 h-6 bg-blue-900 opacity-30 rounded-full"></div>
          <div className="absolute top-20 left-16 w-10 h-10 bg-blue-900 opacity-30 rounded-full"></div>
          <div className="absolute top-40 left-6 w-16 h-16 bg-blue-900 opacity-30 rounded-full"></div>
          <div className="absolute top-60 left-24 w-12 h-12 bg-blue-900 opacity-30 rounded-full"></div>
          <div className="absolute bottom-16 right-10 w-20 h-20 bg-blue-900 opacity-30 rounded-full"></div>
          
        </div>

        {/* Footer Content */}
        <div className="relative z-10 max-w-[1500px]  mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Logo */}
            <div>
              <Link to="/">
                <img
                  src="/img/Arise-logo.webp"
                  className="h-20 transition-all duration-500"
                  alt="Logo"
                />
              </Link>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-orange-600 mb-4 text-[30px] underline font-semibold">
                Services
              </p>
              <ul className=" p-0 space-y-2">
                {[
                  { name: "About Us", path: "/aboutUs" },
                  { name: "Contact Us", path: "/contactUs" },
                  { name: "Privacy Policy", path: "/privacyPolicy" },
                  { name: "Terms & Conditions", path: "/termsConditions" },
                  { name: "Our Blog & News", path: "/blogUs" },
                  { name: "Our Team", path: "/ourTeamPage" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-50 hover:text-orange-600 flex items-center text-xl hover:underline hover:font-semibold transition"
                    >
                      <FaAngleRight className="mr-2" /><h4>{link.name}</h4>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
            <p className="text-orange-600  ml-8 mb-4 text-[30px] underline font-semibold">
                Contact Info
              </p>
              <div className="text-gray-50 space-y-3">
                <p>
                  <Link
                    to="https://www.google.com/maps/search/334-Lotus+Enora+Opp+Rutuvilla+Bunglows,+New+Alkapuri,+Vadodara-391101/"

                    className="flex items-center text-xl text-gray-50 hover:text-orange-600 transition"
                  >
                    <FaMapMarkerAlt className="mr-4 text-3xl" />
                    <h4>334-Lotus Enora Opp Rutuvilla Bunglows, New Alkapuri,
                    Vadodara-391101</h4>
                  </Link>
                </p>
                <p>
                  <Link
                    to="mailto:arisehealthcaresolutions1@gmail.com"
                    className="flex items-center text-xl text-gray-50 hover:text-orange-600 transition"
                  >
                    <FaEnvelope className="mr-4 text-2xl" />
                  <h4>arisehealthcaresolutions1@gmail.com</h4>
                  </Link>
                </p>
                <p>
                  <Link
                    to="tel:+919998967036"
                    className="flex items-center text-xl text-gray-50 hover:text-orange-600 transition"
                  >
                    <FaPhone className="mr-4 text-xl" /> <h4>+91 99989 67036</h4>
                  </Link>
                </p>
                <p>
                  <Link
                    to="tel:+918530100483"
                    className="flex items-center text-xl text-gray-50 hover:text-orange-600 transition"
                  >
                    <FaPhone className="mr-4 text-xl" /> <h4>+91 85301 00483</h4>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="text-white py-4 text-center text-lg"
        style={{ background: "#202135" }}
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <span>
            <Link to="/" className="hover:text-gray-400 transition">
              © Arise Healthcare Solutions
            </Link>
            , All rights reserved.
          </span>
          <span>
            Maintain & Manage By{" "}
            <Link
              className="border-b hover:text-gray-400 transition"
              href="https://flagshipinfotech.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Flagship Infotech PVT. LTD
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
