import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

const AboutUs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh(); // Ensures AOS works after dynamic content is rendered
  }, []);

  return (
    <section className="relative bg-[#01345B] py-16 px-6 md:px-12 lg:px-24 text-white overflow-hidden">
          {/* <h1 className="sub-title text-cyan-400 pe-3 mb-0">About Us</h1> */}
          <div className="relative w-fit mx-auto mb-12">
            {/* Background text */}
            <h4 className="relative  text-4xl sm:text-6xl font-bold  tracking-wider text-center px-3 mb-0 text-gray-300 uppercase z-0 pointer-events-none whitespace-nowrap opacity-20">
              About Us
            </h4>
          </div>


      {/* Left Half-Round Bubble */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-blue-900 opacity-30 rounded-full z-0"></div>

      {/* Right Half-Round Bubble */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-80 h-80 bg-blue-900 opacity-30 rounded-full z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="section-title text-start mb-5" data-aos="fade-up">
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            Praesent Elementum Facilisis Leo Vel Fringilla Est
          </h2>

          <div className="mb-6" data-aos="fade-right">
            <p className="text-[32px] font-semibold text-orange-600 mb-2">Etiam Ultricies</p>
            <p className="text-gray-300">
              Maecenas tempus tellus eget condimentum rhoncus sem quam semper libero sit amet adipiscing sem neque sed
              ipsum nam quam nunc blandit vel luctus pulvinar hendrerit id lorem.
            </p>
          </div>

          <div className="mb-8" data-aos="fade-left">
            <p className="text-[32px] font-semibold text-orange-600 mb-2">Nulla Consequat</p>
            <p className="text-gray-300">
              Vestibulum purus quam scelerisque ut mollis sed nonummy id metus nullam accumsan lorem in dui cras
              ultricies mi eu turpis hendrerit fringilla vestibulum ante ipsum primis in faucibus.
            </p>
          </div>

          <button
            className="bg-cyan-500 text-white px-6 py-3 rounded-full hover:bg-cyan-600 transition duration-300 flex items-center gap-2"
            data-aos="zoom-in-up"
          >
            Learn More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Right Image */}
        <div className="relative" data-aos="zoom-in">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-800 opacity-30 rounded-full z-0"></div>
          <img
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
            alt="Team working"
            className="relative z-10 rounded-2xl shadow-lg object-cover w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
