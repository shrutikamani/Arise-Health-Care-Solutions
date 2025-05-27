import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronDown } from "react-icons/fa";

const gujaratCities = [
  "City",
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Rajkot",
  "Bhavnagar",
  "Jamnagar",
  "Gandhinagar",
  "Junagadh",
  "Anand",
  "Navsari",
  "Morbi",
  "Mehsana",
  "Bhuj",
  "Bharuch",
  "Porbandar",
  "Gandhidham",
  "Surendranagar",
  "Valsad",
  "Palanpur",
  "Dahod",
  "Amreli",
  "Godhra",
  "Veraval",
  "Patan",
];

const cityOptions = gujaratCities.map((city) => ({ value: city, label: city }));

const Appointment = () =>
{
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    MobileNumber: "",
    City: "",
    PinCode: "",
    Address: "",
    Message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    const { FirstName, LastName, email, MobileNumber, City, PinCode } = formData;
    if (!FirstName || !LastName || !email || !MobileNumber || !City || !PinCode) {
      toast.error("Please fill in all required fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3030/appointment/person", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Appointment Booked Successfully!");
        setFormData({
          FirstName: "",
          LastName: "",
          email: "",
          MobileNumber: "",
          City: "",
          PinCode: "",
          Address: "",
          Message: "",
        });
      } else {
        data.errors?.length > 0
          ? data.errors.forEach((err) => toast.error(err))
          : toast.error(data.message || "Failed to book appointment.");
      }
    } catch (err) {
      toast.error("Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() =>
  {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="relative bg-[#01345B] py-16 px-6 md:px-12 lg:px-24 text-white overflow-hidden">
      {/* Centered Background Text */}
      <div className="relative w-fit mx-auto mb-12">
        <h4 className="relative text-4xl sm:text-6xl font-bold tracking-wider text-center px-3 mb-0 text-gray-300 uppercase z-0 pointer-events-none whitespace-nowrap opacity-20">
          Book Appointment
        </h4>
      </div>


      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="space-y-6" data-aos="fade-right">
          <h4 className="text-orange-600 text-2xl uppercase tracking-widest">
            Solutions Only here
          </h4>
          <h1 className="text-5xl font-bold leading-tight">
            Book Your Appointment Today
          </h1>
          <p className="text-xl text-gray-200">
            Schedule your visit with our expert healthcare professionals for personalized care and advanced medical services.
          </p>
          <img
            src="https://images.pexels.com/photos/3845976/pexels-photo-3845976.jpeg"
            alt="Healthcare"
            className="w-full max-w-md rounded-xl shadow-lg hidden md:block"
            data-aos="zoom-in"
          />
        </div>

        {/* Right Form */}
        <div
          className="bg-white rounded-2xl shadow-lg p-8"
          data-aos="fade-left"
        >
          {/* <h2 className="text-4xl font-semibold text-orange-600 mb-6 text-center">
            Book Appointment
          </h2> */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-full p-3 text-xl rounded-lg border focus:ring-2 focus:ring-teal-500 text-gray-800  transition duration-300"
              />
              <input
                type="text"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-full p-3 text-xl rounded-lg border border-teal-300 focus:ring-2 focus:ring-teal-500 text-gray-800 hover:border-teal-400 transition duration-300"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full p-3 text-xl rounded-lg border border-teal-300 focus:ring-2 focus:ring-teal-500 text-gray-800 hover:border-teal-400 transition duration-300"
              />
              <input
                type="tel"
                name="MobileNumber"
                value={formData.MobileNumber}
                onChange={handleChange}
                placeholder="Mobile Number"
                required
                className="w-full p-3 text-xl rounded-lg border border-teal-300 focus:ring-2 focus:ring-teal-500 text-gray-800 hover:border-teal-400 transition duration-300"
              />
            </div>

            <div className="relative">
              <select
                name="City"
                value={formData.City}
                onChange={handleChange}
                required
                className="w-full p-3 text-xl rounded-lg border border-teal-300 text-gray-800 appearance-none focus:ring-2 focus:ring-teal-500 pr-10 hover:border-teal-400 transition duration-300"
              >
                {cityOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.value === "City"}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-600" />
            </div>

            <input
              type="text"
              name="PinCode"
              value={formData.PinCode}
              onChange={handleChange}
              placeholder="Pin Code"
              required
              className="w-full p-3 text-xl rounded-lg border border-teal-300 focus:ring-2 focus:ring-teal-500 text-gray-800 hover:border-teal-400 transition duration-300"
            />

            <textarea
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              placeholder="Address"
              rows="2"
              className="w-full p-3 text-xl rounded-lg border border-teal-300 focus:ring-2 focus:ring-teal-500 text-gray-800 hover:border-teal-400 transition duration-300"
            />
            <textarea
              name="Message"
              value={formData.Message}
              onChange={handleChange}
              placeholder="Write Message"
              rows="4"
              className="w-full p-3 text-xl rounded-lg border border-teal-300 focus:ring-2 focus:ring-teal-500 text-gray-800 hover:border-teal-400 transition duration-300"
            />

            <button
              type="submit"
              className="group w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full transition duration-300 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? "Submitting..." : "SUBMIT NOW"}
              <svg
                className="w-4 h-4 transform group-hover:scale-125 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default Appointment;
