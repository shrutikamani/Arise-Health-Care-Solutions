import React from "react";
import illustration from "../../../src/assets/img/illustration.webp"; // Update if needed

const Carousel = () => {
  return (
    <section className="relative h-[750px] mt-28 md:mt-36 lg:mt-[100px] bg-[#01345B] text-white py-16 md:py-20 overflow-hidden">
      {/* Bubble Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-24 h-24 md:w-32 md:h-32 bg-blue-900 opacity-20 rounded-full animate-ping"></div>
        <div className="absolute top-36 left-40 w-12 h-12 md:w-16 md:h-16 bg-blue-900 opacity-20 rounded-full "></div>
        <div className="absolute bottom-16 right-10 w-16 h-16 md:w-24 md:h-24 bg-blue-800 opacity-20 rounded-full animate-ping"></div>
        <div className="absolute bottom-10 left-20 w-20 h-20 md:w-28 md:h-28 bg-blue-700 opacity-20 rounded-full "></div>
        <div className="absolute top-1/2 right-8 w-14 h-14 md:w-20 md:h-20 bg-blue-600 opacity-20 rounded-full "></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 container mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 w-full">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-start font-bold leading-tight">
              Welcome to <br className="block lg:hidden" />
              <span className="text-orange-600"> Arise Healthcare Solutions</span>
            </h1>
            <p className="text-md sm:text-lg md:text-xl text-start text-blue-100 max-w-xl mx-auto lg:mx-0">
              Empowering care with innovative solutions. We deliver quality healthcare services tailored to your needs.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {[
                { value: "250+", label: "Projects Completed" },
                { value: "95%", label: "Client Satisfaction" },
                { value: "15+", label: "Years Experience" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-blue-900 bg-opacity-40 backdrop-blur-md p-4 rounded-lg shadow-md text-center"
                >
                  <h2 className="text-teal-300 text-2xl md:text-3xl font-bold">
                    {stat.value}
                  </h2>
                  <p className="text-blue-100 text-sm md:text-base">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Right Illustration Without Image */}
          <div className="w-full flex justify-center lg:justify-end relative h-[500px]">
            {/* <div className="absolute top-0 left-0 w-24 h-24 bg-orange-500 rounded-full animate-ping"></div> */}
            {/* <div className="absolute top-16 left-20 w-16 h-16 bg-cyan-500 rounded-full animate-bounce"></div> */}
            {/* <div className="absolute top-40 left-10 w-20 h-20 bg-teal-500 rounded-full animate-spin-slow"></div> */}
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 opacity-30 rounded-full blur-xl"></div>
            {/* <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-36 h-36 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"></div> */}
            <div className="w-full flex justify-center lg:justify-end">
            <img
              src={illustration}
              alt="Business Illustration"
              className="w-full h-auto max-h-[450px] md:max-h-[500px] object-contain animate-moveIllustration"
            />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
