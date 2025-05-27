import React, { useEffect, useState } from "react";
import { FaDownload, FaFilter } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import RemarkModal from "../../common/RemarkModal";
import ExportExcel from "../../common/ExportExcel";
import AdminSidebar from "../../common/AdminSaidBar";
import DateRangeFilter from "./DateRangeFilter";

const initialFilters = {
  FirstName: "",
  LastName: "",
  email: "",
  MobileNumber: "",
  City: "",
  PinCode: "",
  Address: "",
  Message: "",
};

const TerminatedInquiries = () => {
  const [terminatedInquiries, setTerminatedInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });

  // Fetch terminated inquiries from API
  useEffect(() => {
    const fetchTerminatedInquiries = async () => {
      try {
        const response = await fetch("http://localhost:3030/appointment/all-appointment");
        const data = await response.json();
        if (response.ok && data.success) {
          const filtered = data.data.filter((appointment) => appointment.status === "Terminated");
          setTerminatedInquiries(filtered);
          setFilteredInquiries(filtered);
        } else {
          setError(data.message || "Failed to fetch terminated inquiries.");
        }
      } catch (error) {
        setError("Error fetching terminated inquiries. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchTerminatedInquiries();
  }, []);

  // Filter inquiries based on filter state and date range
  useEffect(() => {
    const lowerFilters = Object.fromEntries(
      Object.entries(filters).map(([k, v]) => [k, v.toLowerCase()])
    );
    const filtered = terminatedInquiries.filter((item) => {
      // Filter by text fields
      const matchesText = Object.keys(lowerFilters).every(
        (key) =>
          lowerFilters[key] === "" ||
          item[key]?.toString().toLowerCase().includes(lowerFilters[key])
      );
      // Date range filter
      const itemDate = new Date(item.createdAt);
      const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null;
      const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;
      const matchesDate =
        (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);

      return matchesText && matchesDate;
    });
    setFilteredInquiries(filtered);
  }, [filters, terminatedInquiries, dateRange]);

  // Highlight matching text in filtered columns
  const highlightMatch = (text, field) => {
    const search = filters[field]?.toLowerCase();
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: text?.toString().replace(regex, `<span class='bg-yellow-300'>$1</span>`),
        }}
      />
    );
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle filter form visibility
  const toggleFilterForm = () => {
    setShowFilters((prev) => !prev);
  };

  // Update inquiry status via API
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3030/appointment/${id}/status/${newStatus}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success(`Inquiry marked as "${newStatus}" successfully!`);
        if (newStatus !== "Terminated") {
          setTerminatedInquiries((prev) => prev.filter((inquiry) => inquiry._id !== id));
          setFilteredInquiries((prev) => prev.filter((inquiry) => inquiry._id !== id));
        }
      } else {
        toast.error(data.message || "Failed to update status.");
      }
    } catch (error) {
      toast.error("Error updating status. Please try again.");
    }
  };

  // Export inquiries to Excel
  const handleExport = () => {
    ExportExcel(filteredInquiries, "terminated_inquiries_data.xlsx");
  };

  // Save remark for an inquiry
  const handleSaveRemark = (remark) => {
    setTerminatedInquiries((prev) =>
      prev.map((inquiry) =>
        inquiry._id === selectedInquiry._id ? { ...inquiry, remark } : inquiry
      )
    );
    setFilteredInquiries((prev) =>
      prev.map((inquiry) =>
        inquiry._id === selectedInquiry._id ? { ...inquiry, remark } : inquiry
      )
    );
    setSelectedInquiry(null);
  };

  // Open remark modal for an inquiry
  const openRemarkModal = (inquiry) => {
    setSelectedInquiry(inquiry);
  };

  // Reset filters
  const handleReset = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="flex bg-white min-h-screen font-sans">
      <AdminSidebar />
      <div className="flex-1 px-4 md:px-6 py-6 mt-40">
        {/* Action Buttons */}
        <div className="flex justify-end items-center mb-6 flex-wrap gap-3">
          <div className="flex gap-2">
            <button
              onClick={toggleFilterForm}  
               className="bg-[#f3993f]  hover:bg-orange-500 px-4 py-2 rounded text-white transition flex items-center gap-2 text-base md:text-lg"
              aria-label={showFilters ? "Hide filters" : "Show filters"}
            >
              <FaFilter />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button
              onClick={handleExport}
                className="bg-[#f3993f]  hover:bg-orange-500 px-4 py-2 rounded text-white  transition flex items-center gap-2 text-base md:text-lg"
              aria-label="Export to Excel"
            >
              <FaDownload />
              Export to Excel
            </button>
            <Link to="/expert/dashboard">
              <button
                 className="bg-[#f3993f]  hover:bg-orange-500  px-4 py-2 rounded text-white transition flex items-center gap-2 text-base md:text-lg"
                aria-label="Go back to dashboard"
              >
                <IoMdArrowRoundBack />
                Back
              </button>
            </Link>
          </div>
        </div>

        {/* Filter Form */}
        {showFilters && (
          <div className="mb-6 bg-white p-4 rounded-md shadow border border-orange-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {Object.keys(filters).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  placeholder={`Search by ${key}`}
                  value={filters[key]}
                  onChange={handleFilterChange}
                  className="border border-orange-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 text-orange-700 placeholder-orange-400"
                  aria-label={`Filter by ${key}`}
                />
              ))}
            </div>
            <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={handleReset}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition text-base"
                aria-label="Reset filters"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Table or Status Messages */}
        {loading ? (
          <p className="text-center text-orange-600 text-lg">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600 text-lg">{error}</p>
        ) : filteredInquiries.length === 0 ? (
          <p className="text-center text-orange-600 text-lg">No Terminated Inquiries Found</p>
        ) : (
          <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
             <table className="w-full table-fixed border-collapse border border-orange-200 bg-white">
              <thead>
                <tr className="bg-orange-500 text-white font-medium">
                  {[
                    { header: "No.", width: "5%" },
                    { header: "Created At", width: "8%" },
                    { header: "First Name", width: "8%" },
                    { header: "Last Name", width: "8%" },
                    { header: "Email", width: "12%" },
                    { header: "Mobile Number", width: "10%" },
                    { header: "City", width: "8%" },
                    { header: "PinCode", width: "7%" },
                    { header: "Address", width: "12%" },
                    { header: "Message", width: "12%" },
                    { header: "Remark", width: "10%" },
                    { header: "Status", width: "10%" },
                  ].map(({ header, width }) => (
                    <th
                      key={header}
                      // className="px-3 py-3 border border-orange-200 text-left text-md font-semibold truncate"
                       className="px-3 py-2 border border-[#FF6600] text-md truncate "
                      style={{ width }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inquiry, index) => (
                  <tr
                    key={inquiry._id}
                    className={`border-t text-[#3f3e3d] font-bold ${
                      index % 2 === 0 ? "bg-white" : "bg-orange-50"
                    } hover:bg-orange-100 transition-colors`}
                  >
                    <td className="px-3 py-2 border border-orange-200 text-md truncate">{index + 1}</td>
                    <td className="px-3 py-2 border border-orange-200 text-md truncate">
                      {new Date(inquiry.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-3 py-2 border border-orange-200 text-md truncate">
                      {highlightMatch(inquiry.FirstName, "FirstName")}
                    </td>
                    <td className="px-3 py-2 border border-orange-200 text-md truncate">
                      {highlightMatch(inquiry.LastName, "LastName")}
                    </td>
                    <td className="px-3 py-2 border border-orange-200 text-md truncate">
                      {highlightMatch(inquiry.email, "email")}
                    </td>
                    <td className="px-3 py-2 border border-orange-200 text-md truncate">
                      {highlightMatch(inquiry.MobileNumber, "MobileNumber")}
                    </td>
                    <td className="px-3 py-2 border border-orange-200 text-md truncate">
                      {highlightMatch(inquiry.City, "City")}
                    </td>
                    <td className="px-3 py-2 border border-orange-200 text-md truncate">
                      {highlightMatch(inquiry.PinCode, "PinCode")}
                    </td>
                    <td className="px-3 py-2 border border-orange-200 text-md truncate">
                      {highlightMatch(inquiry.Address, "Address")}
                    </td>
                    <td className="px-3 py-2 border border-orange-200 text-md truncate">
                      {highlightMatch(inquiry.Message, "Message")}
                    </td>
                    <td className="px-3 py-2 border border-orange-200 text-md truncate">
                      {inquiry.remark || "N/A"}
                    </td>
                    <td className="px-3 py-2 border border-orange-200 text-md">
                      <div className="flex flex-col gap-2">
                        <select
                          value={inquiry.status || "Terminated"}
                          onChange={(e) => updateStatus(inquiry._id, e.target.value)}
                          className="border rounded px-2 py-1 text-md text-[#3f3e3d] font-bold bg-white border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
                          aria-label={`Update status for inquiry ${inquiry._id}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Opened">Opened</option>
                          <option value="Closed">Closed</option>
                          <option value="Terminated">Terminated</option>
                        </select>
                        <button
                          onClick={() => openRemarkModal(inquiry)}
                         className="bg-orange-500 text-white font-bold px-2 py-1 rounded text-sm w-full"
                          aria-label={`Add remark for inquiry ${inquiry._id}`}
                        >
                          Add Remark
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <RemarkModal
          isOpen={selectedInquiry !== null}
          onClose={() => setSelectedInquiry(null)}
          onSave={handleSaveRemark}
          appointment={selectedInquiry}
        />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default TerminatedInquiries;
