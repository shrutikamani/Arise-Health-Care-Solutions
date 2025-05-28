// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaCheck } from "react-icons/fa6";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../style.css";

// const AboutUs = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true });
//   }, []);

//   return (
//     <div className="container-fluid about bg-light py-5">
//       <div className="container py-5">
//         <div className="row g-5 align-items-center">
//           {/* Left Image Section */}
//           <div className="col-lg-5" data-aos="fade-right">
//             <div className="about-img pb-5 ps-5 position-relative">
//               <img
//                 src="img/about-1.jpg"
//                 className="img-fluid rounded w-100"
//                 style={{ objectFit: "cover" }}
//                 alt="About 1"
//               />
//               <div className="about-img-inner">
//                 <img
//                   src="img/about-2.jpg"
//                   className="img-fluid rounded-circle w-100 h-100"
//                   alt="About 2"
//                 />
//               </div>
//               <div className="about-experience">15 years experience</div>
//             </div>
//           </div>

//           {/* Right Content Section */}
//           <div className="col-lg-7" data-aos="fade-left">
//             <div className="section-title text-start mb-5">
//               <h4 className="sub-title pe-3 mb-0">About Us</h4>
//               <h1 className="display-3 mb-4 fw-semibold">
//                 We are Ready to Help.
//               </h1>
//               <p className="mb-4">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
//                 deleniti amet at atque sequi quibusdam cumque itaque repudiandae
//                 temporibus, eius nam mollitia voluptas maxime veniam
//                 necessitatibus saepe in ab? Repellat!
//               </p>

//               <div className="mb-4">
//                 <p className="text-secondary d-flex align-items-center">
//                   <FaCheck className="text-info me-2 fs-4" />
//                   Refreshing to get such a personal touch.
//                 </p>
//                 <p className="text-secondary d-flex align-items-center">
//                   <FaCheck className="text-info me-2 fs-4" />
//                   Duis aute irure dolor in reprehenderit in voluptate.
//                 </p>
//                 <p className="text-secondary d-flex align-items-center">
//                   <FaCheck className="text-info me-2 fs-4" />
//                   Velit esse cillum dolore eu fugiat nulla pariatur.
//                 </p>
//               </div>

//               <div className="d-flex">
//                 <Link
//                   to="/"
//                   className="btn btn-info rounded-pill text-white py-3 px-5 me-3"
//                 >
//                   Discover More
//                 </Link>
//                 <button
//                   onClick={() => navigate("/contactUs")}
//                   className="btn btn-outline-info rounded-pill py-3 px-5"
//                 >
//                   Contact Us
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;


// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaCheck } from "react-icons/fa6";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../style.css";

// const AboutUs = () =>
// {
//   const navigate = useNavigate();

//   useEffect(() =>
//   {
//     AOS.init({ duration: 1000, once: true });
//   }, []);

//   return (

//     <section className="relative bg-[#01345B] py-16 px-6 md:px-12 lg:px-24 text-white overflow-hidden">
//       {/* Left Half-Round Bubble */}
//       <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-blue-900 opacity-30 rounded-full z-0"></div>

//       {/* Right Half-Round Bubble */}
//       <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-80 h-80 bg-blue-900 opacity-30 rounded-full z-0"></div>

//       {/* Content */}
//       <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
//         {/* Left Content */}
//         <div className="section-title text-start mb-5">
//           <h1 className="sub-title text-cyan-400 pe-3 mb-0">About Us</h1>
//           <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
//             Praesent Elementum Facilisis Leo Vel Fringilla Est
//           </h2>

//           <div className="mb-6">
//             <p className="text-[32px] font-semibold text-orange-600 mb-2">Etiam Ultricies</p>
//             <p className="text-gray-300">
//               Maecenas tempus tellus eget condimentum rhoncus sem quam semper libero sit amet adipiscing sem neque sed
//               ipsum nam quam nunc blandit vel luctus pulvinar hendrerit id lorem.
//             </p>
//           </div>

//           <div className="mb-8">
//             <p className="text-[32px] font-semibold text-orange-600 mb-2">Nulla Consequat</p>
//             <p className="text-gray-300">
//               Vestibulum purus quam scelerisque ut mollis sed nonummy id metus nullam accumsan lorem in dui cras
//               ultricies mi eu turpis hendrerit fringilla vestibulum ante ipsum primis in faucibus.
//             </p>
//           </div>

//           <button className="bg-cyan-500 text-white px-6 py-3 rounded-full hover:bg-cyan-600 transition duration-300 flex items-center gap-2">
//             Learn More
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </button>
//         </div>

//         {/* Right Image */}
//         <div className="relative">
//           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-800 opacity-30 rounded-full z-0"></div>
//           <img
//             src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
//             alt="Team working"
//             className="relative z-10 rounded-2xl shadow-lg object-cover w-full"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutUs;



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
