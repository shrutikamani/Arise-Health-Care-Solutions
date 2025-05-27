

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
// import AdminNavbar from "./AdminNavbar";
import AdminSaidBar from "./AdminSaidBar";

const Dashboard = () =>
{
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [remark, setRemark] = useState("");
  const [isOpen, setIsOpen] = useState(false); // For AdminHeader toggle (optional)

  // Format Date to dd-mm-yyyy
  const formatDate = (dateString) =>
  {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
  };

  // Fetch all appointments
  useEffect(() =>
  {
    const fetchAppointments = async () =>
    {
      try {
        const response = await fetch("http://localhost:3030/appointment/all-appointment");
        const data = await response.json();
        if (response.ok && data.success) {
          setAppointments(data.data);
          filterAppointments(data.data);
        } else {
          setError("Failed to fetch appointments.");
        }
      } catch (error) {
        setError("Error fetching appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filter appointments from today and yesterday
  const filterAppointments = (allAppointments) =>
  {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const filtered = allAppointments.filter((appointment) =>
    {
      const appointmentDate = new Date(appointment.createdAt);
      appointmentDate.setHours(0, 0, 0, 0);
      return appointmentDate.getTime() === today.getTime() || appointmentDate.getTime() === yesterday.getTime();
    });

    setFilteredAppointments(filtered);
  };

  // Open remark modal
  const openRemarkModal = (appointment) =>
  {
    setSelectedAppointment(appointment);
    setRemark(appointment.remark || "");
    setShowModal(true);
  };

  // Save remark and update state
  const handleSaveRemark = async () =>
  {
    if (!selectedAppointment || !remark.trim()) {
      toast.warn("Please enter a remark before saving.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3030/appointment/remark/${selectedAppointment._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ remark }),
      });

      const data = await response.json();
      if (data.success) {
        const updatedAppointments = appointments.map((appointment) =>
          appointment._id === selectedAppointment._id ? { ...appointment, remark } : appointment
        );

        setAppointments(updatedAppointments);
        filterAppointments(updatedAppointments);
        toast.success("Remark added successfully!");
      } else {
        toast.error(data.message || "Failed to save remark.");
      }
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <AdminHeader
        pageTitle="Dashboard"
      />

      {/* Navbar */}
      <AdminSaidBar />


      {/* Main Content */}
      <div className="pt-44 px-6 pb-6"> {/* Adjusted padding-top to account for header (h-20) and navbar (h-16) */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-center text-3xl font-bold border-[#FF6600]  text-[#FF9933] mb-6">Recent Inquiry</h3>

          {loading ? (
            <p className="text-center text-[#FF9933]">Loading...</p>
          ) : error ? (
            <p className="text-center text-[#FF9933]">{error}</p>
          ) : filteredAppointments.length === 0 ? (
            <p className="text-center text-[#FF9933]">No Inquiry Found...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1300px] border border-[#FF6600] text-left">
                <thead className="bg-white text-[#FF9933]">
                  <tr>
                    {[
                      "No.",
                      "Created At",
                      "First Name",
                      "Last Name",
                      "Email",
                      "Mobile Number",
                      "City",
                      "PinCode",
                      "Address",
                      "Message",
                      "Status",
                      "Remark",
                      "Action",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 border-b border-[#FF6600] text-sm font-semibold"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment, index) => (
                    <tr key={appointment._id} className="border-b border-[#FF6600]">
                      <td className="p-2 text-[#FF9933]">{index + 1}</td>
                      <td className="p-2 text-[#FF9933]">{formatDate(appointment.createdAt)}</td>
                      <td className="p-2 text-[#FF9933]">{appointment.FirstName}</td>
                      <td className="p-2 text-[#FF9933]">{appointment.LastName}</td>
                      <td className="p-2 text-[#FF9933]">{appointment.email}</td>
                      <td className="p-2 text-[#FF9933]">{appointment.MobileNumber}</td>
                      <td className="p-2 text-[#FF9933]">{appointment.City}</td>
                      <td className="p-2 text-[#FF9933]">{appointment.PinCode}</td>
                      <td className="p-2 text-[#FF9933]">{appointment.Address}</td>
                      <td className="p-2 text-[#FF9933]">{appointment.Message}</td>
                      <td className="p-2 text-[#FF9933]">{appointment.status || "Pending"}</td>
                      <td className="p-2 text-[#FF9933]">{appointment.remark || "N/A"}</td>
                      <td className="p-2">
                        <button
                          className="bg-white text-[#FF9933] px-3 py-1 rounded text-md hover:bg-[#FFCC99]"
                          onClick={() => openRemarkModal(appointment)}
                        >
                          Add Remark
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Remark Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4 text-[#FF9933]">Add Remark</h2>
              <input
                type="text"
                className="w-full border border-[#FF6600] p-2 rounded focus:outline-none focus:ring focus:ring-[#FF6600] text-[#FF9933] placeholder-[#FF9933]"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Enter remark"
              />
              <div className="flex justify-end mt-4">
                <button
                  className="bg-white text-[#FF9933] px-4 py-2 rounded mr-2 hover:bg-[#FFCC99]"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-white text-[#FF9933] px-4 py-2 rounded hover:bg-[#FFCC99]"
                  onClick={handleSaveRemark}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Dashboard;