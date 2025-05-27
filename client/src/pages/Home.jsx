  import React from "react";
  import Services from "../components/features/Services";
  import AboutUs from "../components/features/About";
  import Features from "../components/features/Features";
  import Appointment from "../components/features/Appointment";
  import OurTeam from "../components/features/Team";
  import Testimonial from "../components/features/Testimonial";
  // import OurBlog from "../components/features/Blog";
  import "../style.css"; 
  import Carousel from "../components/features/Carousel";
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
import CareImpactSection from "../components/features/CareImpactSection";

  const Home = () =>
  {
    return (
      <div>
        <Carousel />
        <Services />
        <AboutUs />
        <Features />
        <ToastContainer position="top-right" autoClose={3000} />
        <Appointment />
        <OurTeam />
        <Testimonial />
        <CareImpactSection/>
        {/* <OurBlog /> */}
      </div>

    );
  };

  export default Home;
