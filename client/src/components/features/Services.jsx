import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "../style.css";
import { Link } from "react-router-dom";
import BubbleBackground from "./BubbleBackground";

const Services = () =>
{
  useEffect(() =>
  {
    AOS.init({ duration: 1000 });

  }, []);
  const services = [
    {
      id: 1,
      imgSrc: "/img/service-1.jpg",
      title: "Hospital Furniture",
      description: "Providing the best hospital furniture for maximum comfort.",
    },
    {
      id: 2,
      imgSrc: "/img/service-2.jpg",
      title: "Operation Theater",
      description: "Equipped with advanced tools for surgeries and treatments.",
    },
    {
      id: 3,
      imgSrc: "/img/service-3.png",
      title: "ICU Product",
      description: "High-quality ICU products for critical care needs.",
    },
  ];

  return (

    <div className="relative py-20 min-h-[100vh] overflow-hidden " style={{ backgroundColor: "rgba(240, 242, 245, 0.9)" }}>
      {/* Bubble Background Canvas */}
   <BubbleBackground/>
      {/* Section Title */}
      <div className="py-2 px-5">
        <div
          className="section-title mb-5 text-center"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          <div className="relative mx-auto mb-8">
          
            {/* Foreground title */}
            <h4 className="relative  text-4xl sm:text-6xl font-bold  tracking-wider text-center px-3 mb-0 text-orange-900 uppercase z-0 pointer-events-none whitespace-nowrap opacity-20">
              Our Services
            </h4>
          </div>

          <h1 className="text-5xl mb-2 fw-semibold text-gray-800">
            Our Service Given By Expert
          </h1>
          <p className="mb-0 text-gray-600 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            deleniti amet at atque sequi quibusdam cumque itaque repudiandae
            temporibus, eius nam mollitia voluptas maxime veniam necessitatibus
            saepe in ab? Repellat!
          </p>
        </div>
      </div>

      {/* Service Cards */}
      <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 justify-content-center">
          {services.map((service, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6"
              data-aos="zoom-in"
              data-aos-delay={300 + index * 100}
            >
              {/* <div className="relative bg-white rounded-lg shadow-lg overflow-hidden service-card">
                <div className="img group overflow-hidden rounded-lg">
                  <img
                    src={service.imgSrc}
                    className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                    alt={service.title}
                  />
                </div>
                <div className="absolute left-5 right-5 bottom-5 p-6 transition-all duration-300 ease-in-out text-center rounded-lg shadow-md bg-white/95">
                  <h3 className="mb-4 text-3xl font-semibold text-slate-700">
                    {service.title}
                  </h3>
                  <p className="mb-4 text-gray-700">{service.description}</p>
                  <Link
                    to="/"
                    className="inline-block bg-teal-500 text-white rounded-full py-2 px-5 hover:bg-teal-600 transition duration-200"
                  >
                    Read More
                  </Link>
                </div>
              </div> */}

              <div className="w-full max-w-md perspective">
                <div className="relative w-full h-96 transition-transform duration-700 transform-style preserve-3d hover:rotate-y-180">
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden">
                    <img
                      src={service.imgSrc}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-800 bg-opacity-30 flex items-center justify-center">
                      <h1 className="text-4xl font-bold text-white ">{service.title}</h1>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#01345B] rounded-lg shadow-md p-6 flex flex-col justify-center items-center">
                    <h1 className="text-4xl text-orange-600 font-semibold mb-4">{service.title}</h1>
                    <p className="text-slate-100 mb-4 text-center">{service.description}</p>
                    <Link
                      to="/"
                      className="inline-block bg-teal-500 text-white rounded-full py-2 px-5 hover:bg-teal-600 transition duration-200"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
