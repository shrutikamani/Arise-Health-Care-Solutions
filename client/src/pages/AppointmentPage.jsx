import React from 'react';
import Appointment from '../components/features/Appointment';
import { Link } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentPage = () => {
  return (
    <>
      {/* Breadcrumb Section */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5">
          <h3 className="text-white text-3xl sm:text-4xl md:text-5xl mb-4">
            Book Appointment
          </h3>
          <ul className="breadcrumb d-flex justify-center items-center mb-0">
            <li className="breadcrumb-item">
              <Link to="/" className="text-white hover:text-info">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/" className="text-white hover:text-info">Appointment</Link>
            </li>
            <li className="breadcrumb-item active text-info">About</li>
          </ul>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Appointment Component */}
      <div className="container py-5 px-4 sm:px-8 md:px-16">
        <div className="wow animate__animated animate__fadeInUp" data-wow-delay="0.2s" data-aos="fade-up">
          <Appointment />
        </div>
      </div>
    </>
  );
};

export default AppointmentPage;
