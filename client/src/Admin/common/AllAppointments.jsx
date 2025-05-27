import React, { useEffect, useState } from "react";
import { FaTrash, FaDownload } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { utils, writeFile } from "xlsx";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [remarks, setRemarks] = useState({});

  // all fetchAppointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:3030/appointment/all-appointment");
        const data = await response.json();
        if (data.success) {
          setAppointments(data.data);
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

  //handleRemarkChange
  const handleRemarkChange = (id, value) => {
    setRemarks((prev) => ({ ...prev, [id]: value }));
  };

  const submitRemark = async (id) => {
    try {
      const remarkText = remarks[id]; // Get the user's input
      if (!remarkText) {
        toast.warn("Enter a remark before saving.");
        return;
      }

      // Get the current date and time
      const currentDate = new Date().toLocaleString(); // Example: "3/27/2025, 10:45 AM"

      // Combine the remark with the date
      const formattedRemark = `${remarkText} (Added on: ${currentDate})`;

      const response = await fetch(`http://localhost:3030/appointment/remark/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ remark: formattedRemark }), // Send remark with date
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save remark.");
      }

      if (data.success) {
        toast.success("Remark added successfully!");
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment._id === id ? { ...appointment, remark: formattedRemark } : appointment
          )
        );
      } else {
        toast.error(data.message || "Failed to save remark.");
      }
    } catch (error) {
      console.error("Error in submitRemark:", error);
      toast.error(error.message || "Error saving remark.");
    }
  };

  const deleteAppointment = (id) => {
    if (!window.confirm("Are You Sure You Want to Delete...?")) return;
    setAppointments((prev) => prev.filter((appointment) => appointment._id !== id));
    toast.success("Appointment Removed...!");
  };

  const exportToExcel = () => {
    if (appointments.length === 0) {
      toast.warn("No data to export!");
      return;
    }

    const formattedData = appointments.map((appointment, index) => ({
      "No.": index + 1,
      "First Name": appointment.FirstName,
      "Last Name": appointment.LastName,
      "Email": appointment.email,
      "Mobile Number": appointment.MobileNumber,
      "City": appointment.City,
      "Address": appointment.Address,
      "Message": appointment.Message,
      "Remark": appointment.remark || "N/A",
    }));

    const worksheet = utils.json_to_sheet(formattedData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Appointments");
    writeFile(workbook, "appointments_data.xlsx");
    toast.success("Excel file downloaded!");
  };

  return (
    <div className="container-fluid mt-4 bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-[#FF9933] fw-semibold p-2">All Appointments</h3>

        <div className="d-flex justify-content-end gap-3">
          <button className="btn btn-success d-flex align-items-center gap-2 bg-white text-[#FF9933] hover:bg-[#FFCC99]" onClick={exportToExcel}>
            <FaDownload className="text-[#FF9933]" /> Export to Excel
          </button>
          <Link to="/expert/dashboard">
            <Button variant="dark" className="d-flex align-items-center gap-2 bg-white text-[#FF9933] hover:bg-[#FFCC99]">
              <IoMdArrowRoundBack className="text-[#FF9933]" /> Back
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-[#FF9933]">Loading...</p>
      ) : error ? (
        <p className="text-center text-[#FF9933]">{error}</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-[#FF9933]">No Appointments Found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped border-[#FF6600]">
            <thead className="bg-white text-[#FF9933] border-[#FF6600]">
              <tr>
                <th>No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>City</th>
                <th>Address</th>
                <th>Message</th>
                <th>Remark</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="border-[#FF6600] text-[#FF9933]">
              {appointments.map((appointment, index) => (
                <tr key={appointment._id}>
                  <td>{index + 1}</td>
                  <td>{appointment.FirstName}</td>
                  <td>{appointment.LastName}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.MobileNumber}</td>
                  <td>{appointment.City}</td>
                  <td>{appointment.Address}</td>
                  <td>{appointment.Message}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-[#FF6600] focus:ring-[#FF6600] focus:border-[#FF6600] text-[#FF9933] placeholder-[#FF9933]"
                      value={remarks[appointment._id] || appointment.remark || ""}
                      onChange={(e) => handleRemarkChange(appointment._id, e.target.value)}
                      placeholder="Enter remark"
                    />
                  </td>
                  <td className="d-flex gap-2">
                    <button className="btn btn-primary btn-md bg-white text-[#FF9933] hover:bg-[#FFCC99]" onClick={() => submitRemark(appointment._id)}>
                      Save
                    </button>
                    <button className="btn btn-danger btn-md bg-white text-[#FF9933] hover:bg-[#FFCC99]" onClick={() => deleteAppointment(appointment._id)}>
                      <FaTrash className="text-[#FF9933]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AllAppointments;