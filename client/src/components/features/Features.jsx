import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../style.css"; // Optional, if you have custom styles
import BubbleBackground from "./BubbleBackground";

const Features = () =>
{
  const [features, setFeatures] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() =>
  {
    AOS.init({ duration: 1000 });
    fetchFeatures();
  }, []);

  const fetchFeatures = async () =>
  {
    try {
      const res = await fetch("http://localhost:3030/feature/all");
      const data = await res.json();
      if (res.ok) {
        setFeatures(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch features");
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  const toggleShowMore = (index) =>
  {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="relative w-full feature py-16 overflow-hidden" style={{ backgroundColor: "rgba(240, 242, 245, 0.9)" }}>
      <BubbleBackground />

      <div className="max-w-[90rem] mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div
          className="section-title mb-12 text-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="relative w-fit mx-auto mb-12">
            {/* Background text */}
            <h4 className="relative  text-4xl sm:text-6xl font-bold  tracking-wider text-center px-3 mb-0 text-gray-700 uppercase z-0 pointer-events-none whitespace-nowrap opacity-20">
              Features
            </h4>
          </div>

          <h1 className="text-4xl lg:text-5xl font-semibold mb-4">
            Why Choose Us? Get Your Life Style Back
          </h1>
          <p className="text-gray-600 text-md max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            deleniti amet at atque sequi quibusdam cumque itaque repudiandae
            temporibus, eius nam mollitia voluptas maxime veniam necessitatibus
            saepe in ab? Repellat!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) =>
          {
            let imageSrc = "";

            if (typeof feature.images === "string") {
              imageSrc = feature.images.startsWith("http")
                ? feature.images
                : `http://localhost:3030${feature.images}`;
            } else if (
              Array.isArray(feature.images) &&
              feature.images.length > 0
            ) {
              imageSrc = feature.images[0].startsWith("http")
                ? feature.images[0]
                : `http://localhost:3030${feature.images[0]}`;
            }

            return (
              <div
                key={feature._id}
                data-aos="fade-up"
                data-aos-delay={200 * (index + 1)}
                className="relative bg-white border border-[#01345B]  group rounded-3xl p-8 shadow-sm hover:shadow-2xl transform transition-all duration-800 overflow-hidden"
              >
                {/* Hover BG */}
                <div className="absolute inset-0 bg-[#01345B] scale-0 group-hover:scale-100 transition-transform duration-500 origin-top-right z-0 rounded-3xl" />

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0  bg-[#01345B] rounded-bl-[100%] z-10" />


                {/* Content */}
                <div className="relative z-20">
                  <div className="w-full flex justify-center mb-6">
                    <img
                      src={imageSrc}
                      alt={feature.title}
                      className="w-44 h-44 object-contain transition-transform duration-500 group-hover:scale-125"
                    />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800 text-center capitalize transition-colors duration-500 group-hover:text-white">
                    {feature.title}
                  </h2>
                  <p className="mt-2 text-center text-gray-600 text-md leading-relaxed break-words transition-colors duration-500 group-hover:text-white">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Button */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="200">
          <Link
            to="/"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full py-3 px-6 transition duration-300"
          >
            More Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
