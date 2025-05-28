import React, { useEffect, useState } from "react";
import { FaDownload, FaFilter } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import ExportExcel from "../../common/ExportExcel";
import RemarkModal from "../../common/RemarkModal";
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

const OpenInquiries = () => {
  const [openInquiries, setOpenInquiries] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    const fetchOpenInquiries = async () => {
      try {
        const response = await fetch("http://localhost:3030/appointment/all-appointment");
        const data = await response.json();
        if (response.ok && data.success) {
          const openedInquiries = data.data.filter(
            (appointment) => appointment.status === "Opened"
          );
          setOpenInquiries(openedInquiries);
          setFilteredAppointments(openedInquiries);
        } else {
          setError(data.message || "Failed to fetch open inquiries.");
        }
      } catch (error) {
        setError("Error fetching open inquiries. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchOpenInquiries();
  }, []);

  useEffect(() => {
    const lowerFilters = Object.fromEntries(
      Object.entries(filters).map(([k, v]) => [k, v.toLowerCase()])
    );
    const filtered = openInquiries.filter((item) => {
      const matchesText = Object.keys(lowerFilters).every((key) =>
        item[key]?.toString().toLowerCase().includes(lowerFilters[key])
      );
      const itemDate = new Date(item.createdAt);
      const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null;
      const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;
      const matchesDate = (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
      return matchesText && matchesDate;
    });
    setFilteredAppointments(filtered);
  }, [filters, openInquiries, dateRange]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFilterForm = () => {
    setShowFilters((prev) => !prev);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3030/appointment/${id}/status/${newStatus}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success(`Inquiry marked as "${newStatus}" successfully!`);
        setOpenInquiries((prev) => prev.filter((a) => a._id !== id));
        setFilteredAppointments((prev) => prev.filter((a) => a._id !== id));
      } else {
        toast.error(data.message || "Failed to update status.");
      }
    } catch (error) {
      toast.error("Error updating status. Please try again.");
    }
  };

  const handleExport = () => {
    ExportExcel(filteredAppointments, "open_appointments_data.xlsx");
  };

  const handleSaveRemark = (remark) => {
    setOpenInquiries((prev) =>
      prev.map((inquiry) =>
        inquiry._id === selectedAppointment._id ? { ...inquiry, remark } : inquiry
      )
    );
    setFilteredAppointments((prev) =>
      prev.map((inquiry) =>
        inquiry._id === selectedAppointment._id ? { ...inquiry, remark } : inquiry
      )
    );
    setSelectedAppointment(null);
  };

  const openRemarkModal = (inquiry) => {
    setSelectedAppointment(inquiry);
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  const handleSort = (columnName) => {
    let direction = "asc";
    if (sortConfig.key === columnName && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnName, direction });
  };

  const sortedAppointments = React.useMemo(() => {
    if (sortConfig.key) {
      const sorted = [...filteredAppointments].sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        if (sortConfig.key === "createdAt") {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
      return sorted;
    }
    return filteredAppointments;
  }, [filteredAppointments, sortConfig]);

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

  return (
    <div className="flex bg-orange-50 min-h-screen font-sans">
      <AdminSidebar />
      <div className="flex-1 px-4 md:px-6 py-6 mt-40">
        <div className="flex justify-end items-center mb-6 flex-wrap gap-3">
          <div className="flex gap-2">
            <button
              onClick={toggleFilterForm}
              className="bg-[#f3993f] hover:bg-orange-500 px-4 py-2 rounded text-white transition flex items-center gap-2 text-base md:text-lg"
              aria-label={showFilters ? "Hide filters" : "Show filters"}
            >
              <FaFilter />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button
              onClick={handleExport}
              className="bg-[#f3993f] hover:bg-orange-500 px-4 py-2 rounded text-white transition flex items-center gap-2 text-base md:text-lg"
              aria-label="Export to Excel"
            >
              <FaDownload />
              Export to Excel
            </button>
            <Link to="/expert/dashboard">
              <button
                className="bg-[#f3993f] hover:bg-orange-500 px-4 py-2 rounded text-white transition flex items-center gap-2 text-base md:text-lg"
                aria-label="Go back to dashboard"
              >
                <IoMdArrowRoundBack />
                Back
              </button>
            </Link>
          </div>
        </div>

        {showFilters && (
          <div className="mb-6 bg-white p-4 rounded-md shadow">
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

        {loading ? (
          <p className="text-center text-orange-600 text-lg">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600 text-lg">{error}</p>
        ) : sortedAppointments.length === 0 ? (
          <p className="text-center text-orange-600 text-lg">No Open Inquiries Found</p>
        ) : (
          <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
            <table className="w-full table-fixed border-collapse border border-orange-200 bg-white">
              <thead>
                <tr className="bg-orange-500 text-white font-medium">
                  {[
                    { header: "No.", width: "5%", sortKey: "" },
                    { header: "Created At", width: "8%", sortKey: "createdAt" },
                    { header: "First Name", width: "8%", sortKey: "FirstName" },
                    { header: "Last Name", width: "8%", sortKey: "LastName" },
                    { header: "Email", width: "12%", sortKey: "email" },
                    { header: "Mobile Number", width: "10%", sortKey: "MobileNumber" },
                    { header: "City", width: "8%", sortKey: "City" },
                    { header: "PinCode", width: "7%", sortKey: "PinCode" },
                    { header: "Address", width: "12%", sortKey: "Address" },
                    { header: "Message", width: "12%", sortKey: "Message" },
                    { header: "Remark", width: "10%", sortKey: "" },
                    { header: "Status", width: "10%", sortKey: "" },
                  ].map(({ header, width, sortKey }) => (
                    <th
                      key={header}
                      style={{ width }}
                      onClick={() => sortKey && handleSort(sortKey)}
                      className={`px-3 py-2 border border-[#FF6600] text-md truncate cursor-${
                        sortKey ? "pointer" : "default"
                      }`}
                    >
                      {header}
                      {sortKey && sortConfig.key === sortKey && (
                        <span>{sortConfig.direction === "asc" ? " 🔼" : " 🔽"}</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedAppointments.map((inquiry, index) => (
                  <tr
                    key={inquiry._id}
                    className={`border-t text-[#3f3e3d] ${
                      index % 2 === 0 ? "bg-white" : "bg-orange-50"
                    } hover:bg-orange-100 transition-colors`}
                  >
                    <td className="px-3 py-2 border border-[#FF6600] text-lg truncate text-[#3f3e3d] font-bold">
                      {index + 1}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-lg truncate text-[#3f3e3d] font-bold">
                      {new Date(inquiry.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-lg truncate text-[#3f3e3d] font-bold">
                      {highlightMatch(inquiry.FirstName, "FirstName")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-lg truncate text-[#3f3e3d] font-bold">
                      {highlightMatch(inquiry.LastName, "LastName")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-lg truncate text-[#3f3e3d] font-bold">
                      {highlightMatch(inquiry.email, "email")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-lg truncate text-[#3f3e3d] font-bold">
                      {highlightMatch(inquiry.MobileNumber, "MobileNumber")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-lg truncate text-[#3f3e3d] font-bold">
                      {highlightMatch(inquiry.City, "City")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-lg truncate text-[#3f3e3d] font-bold">
                      {highlightMatch(inquiry.PinCode, "PinCode")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-lg truncate text-[#3f3e3d] font-bold">
                      {highlightMatch(inquiry.Address, "Address")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-lg truncate text-[#3f3e3d] font-bold">
                      {highlightMatch(inquiry.Message, "Message")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-lg truncate text-[#3f3e3d] font-bold">
                      {inquiry.remark || "N/A"}
                    </td>
                    <td className="px-3 py-2 border border-orange-200 text-lg">
                      <div className="flex flex-col gap-2">
                        <select
                          value={inquiry.status || "Opened"}
                          onChange={(e) => updateStatus(inquiry._id, e.target.value)}
                          className="px-3 py-2 border border-[#FF6600] text-lg truncate text-[#3f3e3d] font-bold"
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
      </div>
      <RemarkModal
        isOpen={selectedAppointment !== null}
        onClose={() => setSelectedAppointment(null)}
        onSave={handleSaveRemark}
        appointment={selectedAppointment}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default OpenInquiries;
