import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const OurTeam = () =>
{
  const navigate = useNavigate();
  const teamMembers = useSelector((state) => state.arise.teamMembers); // Redux team data

  return (
    <div className="bg-[#f0f2f5e6] py-10"
      style={{ backgroundColor: "rgba(240, 242, 245, 0.9)" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="relative text-4xl sm:text-6xl font-bold tracking-wider uppercase text-gray-700 opacity-20 mb-3">
            Meet our team
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">
            Physiotherapy Services from Professional Therapists
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            deleniti amet at atque sequi quibusdam cumque itaque repudiandae
            temporibus, eius nam mollitia voluptas maxime veniam necessitatibus
            saepe in ab? Repellat!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {teamMembers.map((member) => (
            <div className="group w-full sm:w-[45%] lg:w-[22%] bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ">
              {/* Image & Hover Overlay */}
              <div className="relative overflow-hidden rounded-t-xl">
                {/* Team Image */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-blue-600 bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-xl"></div>

                {/* Social Icons on hover */}
                <div className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 group-hover:bottom-5 transition-all duration-500 flex gap-2 z-10">
                  {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                    <Link
                      to="/"
                      key={idx}
                      className="bg-gray-900 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
                    >
                      <Icon className="text-lg" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Card Content */}
              <div className="text-center p-4 border-t border-gray-100">
                <h5 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300">
                  {member.name}
                </h5>
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {member.role}
                </p>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
