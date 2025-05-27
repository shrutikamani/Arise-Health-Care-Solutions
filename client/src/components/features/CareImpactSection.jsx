import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const CareImpactSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);


  return (
    <section className="relative bg-[#CFDCE9] text-center py-32 px-4 min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-11 pointer-events-none"
        style={{
          backgroundImage: "url('https://www.agilitihealth.com/wp-content/uploads/2023/04/healthcare-system-diagram.png')",
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl mt-10 md:text-5xl font-bold text-[#003963] mb-6 leading-snug">
          How Will This Impact Care & <br className="hidden md:block" />
          Costs In My Health System
        </h2>

        <p className="text-gray-800 mt-12 ext-lg md:text-xl leading-relaxed mb-10">
          <strong className="text-orange-600 text-xl md:text-2xl">
            Ready to talk with an Arise HealthCare inventory management expert?
          </strong>{" "}
          Every system faces unique challenges. The locations of your facilities, the populations you serve, your mix
          of critical care and surgical offerings, your workflows, and the composition of your clinical and operational
          teams all factor into the design of the right equipment management solution.Arise HealthCare experts can draw on our
          experience from more than 10,000+ healthcare facilities and health systems across the country to show you
          precisely how our inventory management solutions can impact your clinical and economic outcomes.
        </p>

        <div className="relative inline-block mt-14">
          {/* Optional wave effect can be added here */}
          <Link
            to="/contactUs"
            className="relative z-6 text-orange-600 font-semibold text-xl md:text-xl px-8 py-4 border border-blue-800 bg-slate-50 rounded hover:bg-blue-800 hover:text-white transition-all duration-300"
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CareImpactSection;
