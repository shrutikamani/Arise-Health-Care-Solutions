// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../style.css";

// const Testimonial = () =>
// {
//   return (
//     <div className="container-fluid testimonial mb-4">
//       <div className="text-center">
//         <div className=" mb-4">
//           <div className="">
//           <h4 className="relative text-4xl sm:text-6xl font-bold tracking-wider text-center px-3 mb-0 text-teal-300 uppercase z-0 pointer-events-none whitespace-nowrap opacity-20">
//               Testimonial</h4>
//           </div>
//           <h1 className="text-6xl text-white">What Clients Are Saying</h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonial;



import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Testimonial = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      quote:
        "The team was incredibly supportive and professional. Booking my appointment was seamless, and the care I received was exceptional.",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
    {
      name: "Michael Brown",
      role: "Patient",
      quote:
        "I highly recommend their services. The staff is knowledgeable, and the entire process was smooth and stress-free.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
      name: "Emily Davis",
      role: "Patient",
      quote:
        "Amazing experience! The doctors were attentive, and the facilities were top-notch. I felt well cared for throughout my visit.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
  ];

  return (
    <section className="relative bg-[#01345B] py-16 px-6 md:px-12 lg:px-24 text-white overflow-hidden">
      {/* Decorative Half-Round Bubbles */}
      <div className="absolute top-1/4 left-0 transform -translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-blue-900 opacity-30 rounded-full z-0"></div>
      <div className="absolute bottom-1/4 right-0 transform translate-x-1/2 w-80 h-80 bg-blue-900 opacity-30 rounded-full z-0"></div>

      {/* Section Title */}
      <div className="text-center mb-12">
        <div className="relative w-fit mx-auto mb-4">
          <h4 className="relative text-4xl sm:text-6xl font-bold tracking-wider text-center px-3 mb-0 text-teal-300 uppercase z-0 pointer-events-none whitespace-nowrap opacity-20">
            Testimonial
          </h4>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white" data-aos="fade-down">
          What Our Patients Are Saying
        </h1>
      </div>

      {/* Testimonial Cards */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 text-center transition duration-300 hover:shadow-xl"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-teal-200"
            />
            <h3 className="text-xl font-semibold text-teal-800 mb-2">
              {testimonial.name}
            </h3>
            <p className="text-sm text-teal-600 mb-4">{testimonial.role}</p>
            <p className="text-gray-600 italic">"{testimonial.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
