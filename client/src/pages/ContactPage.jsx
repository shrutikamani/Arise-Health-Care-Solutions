import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "aos/dist/aos.css";
import AOS from "aos";
import "../style.css"; // Ensure this points to the custom CSS file
import BubbleBackground from "../components/features/BubbleBackground";

const ContactUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      {/* Breadcrumb Section */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5">
          <h3 className="text-white display-1 mb-4">Contact Us</h3>
          <ul className="breadcrumb d-flex justify-content-center">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/">Pages</Link>
            </li>
            <li className="breadcrumb-item active text-primary">Contact</li>
          </ul>
        </div>
      </div>

      {/* Contact Section */}
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "rgba(240, 242, 245, 0.9)" }}
      >
        <BubbleBackground />
        <div className="container py-5">
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="section-title mb-5 text-center"
          >
            <h3 className="text-orange-600 display-1">How to Find Us</h3>
            <p className="text-[#003963] display-5">
              If you have any Questions, Simply Call, and we'll Respond Promptly.
            </p>
          </div>

          <div className="row justify-center text-blue-900">
            {/* Contact Info */}
            <div
              className="col-12 col-md-6 col-lg-6 mt-5 mb-md-0"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <div className="flex items-center p-4 mt-32">
                <h3 className="mb-0 flex-column">
                  <Link
                    to="tel:+919998967036"
                    className="d-flex align-items-center mb-4 text-blue-900"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <FaPhoneAlt size={30} className="text-blue-900 me-3" />
                    </motion.div>
                    +91 99989 67036
                  </Link>
                  <Link
                    to="tel:+918530100483"
                    className="d-flex align-items-center text-blue-900"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <FaPhoneAlt size={30} className="text-blue-900 me-3" />
                    </motion.div>
                    +91 85301 00483
                  </Link>
                </h3>
              </div>

              <div className="d-flex align-items-center p-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <FaMapMarkerAlt size={30} className="text-blue-900  me-3" />
                </motion.div>
                <h4>
                  <Link
                    to="https://www.google.com/maps/search/334-Lotus+Enora+Opp+Rutuvilla+Bunglows,+New+Alkapuri,+Vadodara-391101/"
                    className="text-blue-900"
                  >
                    334-Lotus Enora, Opp Rutuvilla Bunglows, New Alkapuri,
                    Vadodara-391101
                  </Link>
                </h4>
              </div>

              <div className="d-flex align-items-center p-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <MdEmail size={32} className="text-blue-900 me-3" />
                </motion.div>
                <h3 className="mb-0">
                  <Link
                    to="mailto:arisehealthcaresolutions1@gmail.com"
                    className="text-blue-900"
                  >
                    arisehealthcaresolutions1@gmail.com
                  </Link>
                </h3>
              </div>
            </div>

            {/* Google Map & Social Media */}
            <div className="col-12 col-md-6 col-lg-5">
              <div
                data-aos="fade-up"
                data-aos-delay="600"
                className="d-flex justify-content-center mt-4 "
              >
                {[
                  { icon: <FaFacebookF />, link: "https://facebook.com" },
                  { icon: <FaTwitter />, link: "https://twitter.com" },
                  { icon: <FaInstagram />, link: "https://instagram.com" },
                  { icon: <FaLinkedinIn />, link: "https://linkedin.com" },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    className="w-[60px] h-[60px] text-2xl bg-slate-50 hover:bg-[#003963]
                    hover:text-white rounded-full mx-2 flex items-center justify-center mb-4 border-2 border-[#003963]"
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>

              <iframe
                data-aos="fade-left"
                data-aos-delay="400"
                className="rounded w-100"
                style={{ height: "500px" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.149566225057!2d73.1594833150576!3d22.311089985308346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5e7b5bfffff%3A0x7e4d6e1b5a4c3b2!2s334%2C%20Lotus%20Enora%2C%20Opp%20Rutuvilla%20Bunglows%2C%20New%20Alkapuri%2C%20Vadodara%2C%20Gujarat%20391101%2C%20India!5e0!3m2!1sen!2sus!4v1667901234567!5m2!1sen!2sus"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;