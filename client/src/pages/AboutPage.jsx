import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css"; 
import AboutUs from "../components/features/About";
import OurTeam from "../components/features/Team";
import Features from "../components/features/Features";
import { Link } from "react-router-dom";

const AboutPage = () =>
{
 
  return (
    <>
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: "900px" }}>
          <h3
            className="text-white display-1 mb-4 wow animate__animated animate__fadeInDown"
            data-wow-delay="0.1s"
          >
            About Us
          </h3>
          <ul
            className="breadcrumb d-flex justify-content-center items-center mb-0 wow animate__animated animate__fadeInDown"
            data-wow-delay="0.3s"
          >
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/">Pages</Link>
            </li>
            <li className="breadcrumb-item active text-info">About</li>
          </ul>
        </div>
      </div>
      <div className="wow animate__animated animate__fadeInUp" data-wow-delay="0.2s">
        <AboutUs />
      </div>
      <div className="wow animate__animated animate__fadeInUp" data-wow-delay="0.4s">
        <OurTeam />
      </div>
      <div className="wow animate__animated animate__fadeInUp" data-wow-delay="0.6s">
        <Features />
      </div>
    </>
  );
};

export default AboutPage;
;
