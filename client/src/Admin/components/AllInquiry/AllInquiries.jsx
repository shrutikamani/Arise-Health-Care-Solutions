// import React, { useEffect, useState } from "react";
// import { FaDownload, FaFilter } from "react-icons/fa";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { toast, ToastContainer } from "react-toastify";
// import { Link } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import AdminSidebar from "../../common/AdminSaidBar";
// import ExportExcel from "../../common/ExportExcel";
// import RemarkModal from "../../common/RemarkModal";
// import DateRangeFilter from "./DateRangeFilter";

// const AllInquiries = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [filters, setFilters] = useState({
//     FirstName: "",
//     LastName: "",
//     email: "",
//     MobileNumber: "",
//     City: "",
//     PinCode: "",
//     Address: "",
//     Message: "",
//     status: "",
//   });
//   const [dateRange, setDateRange] = useState({
//     startDate: null,
//     endDate: null,
//     key: "selection",
//   });

//   // Existing useEffect for fetching appointments (unchanged)
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await fetch("http://localhost:3030/appointment/all-appointment");
//         const data = await response.json();
//         if (data.success) {
//           setAppointments(data.data);
//           setFilteredAppointments(data.data);
//         } else {
//           setError("Failed to fetch appointments.");
//         }
//       } catch (error) {
//         setError("Error fetching appointments.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAppointments();
//   }, []);

//   // Existing useEffect for filtering (unchanged)
//   useEffect(() => {
//     const lowerFilters = Object.fromEntries(
//       Object.entries(filters).map(([k, v]) => [k, v.toLowerCase()])
//     );

//     const filtered = appointments.filter((item) => {
//       const matchesText = Object.keys(lowerFilters).every((key) =>
//         item[key]?.toString().toLowerCase().includes(lowerFilters[key])
//       );

//       const itemDate = new Date(item.createdAt);
//       const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null;
//       const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;

//       const matchesDate =
//         (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);

//       return matchesText && matchesDate;
//     });

//     setFilteredAppointments(filtered);
//   }, [filters, appointments, dateRange]);

//   // Existing highlightMatch, updateStatus, handleExport, handleFilterChange (unchanged)
//   const highlightMatch = (text, field) => {
//     const search = filters[field]?.toLowerCase();
//     if (!search) return text;

//     const regex = new RegExp(`(${search})`, "gi");
//     return (
//       <span
//         dangerouslySetInnerHTML={{
//           __html: text?.toString().replace(regex, `<span class='bg-yellow-300'>$1</span>`),
//         }}
//       />
//     );
//   };

//   const updateStatus = async (id, newStatus) => {
//     try {
//       const response = await fetch(`http://localhost:3030/appointment/${id}/status/${newStatus}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await response.json();
//       if (response.ok && data.success) {
//         toast.success("Status updated successfully!");
//         setAppointments((prev) =>
//           prev.map((appointment) =>
//             appointment._id === id ? { ...appointment, status: newStatus } : appointment
//           )
//         );
//       } else {
//         toast.error(data.message || "Failed to update status.");
//       }
//     } catch (error) {
//       toast.error("Error updating status.");
//     }
//   };

//   const handleExport = () => {
//     ExportExcel(filteredAppointments, "appointments_data.xlsx");
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   // Modified handleReset to only reset text filters (date range reset is handled in DateRangeFilter)
//   const handleReset = () => {
//     const cleared = Object.fromEntries(Object.keys(filters).map((k) => [k, ""]));
//     setFilters(cleared);
//   };

//   const handleSaveRemark = (remark) => {
//     setAppointments((prev) =>
//       prev.map((appointment) =>
//         appointment._id === selectedAppointment._id ? { ...appointment, remark } : appointment
//       )
//     );
//     setSelectedAppointment(null);
//   };

//   const openRemarkModal = (appointment) => {
//     setSelectedAppointment(appointment);
//   };

//   return (
//     <div className="flex bg-slate-100 flex-col md:flex-row min-h-screen">
//       <div>
//         <AdminSidebar />
//       </div>

//       <div className="flex-1 px-4 md:px-6 py-6 mt-20">
//         <div className="flex justify-end items-center mb-6 flex-wrap gap-3">
//           <div className="flex gap-2">
//             <button
//               className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition flex items-center gap-2 text-base md:text-lg"
//               onClick={() => setShowFilters((prev) => !prev)}
//             >
//               <FaFilter /> {showFilters ? "Hide Filters" : "Show Filters"}
//             </button>
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center gap-2 text-base md:text-lg"
//               onClick={handleExport}
//             >
//               <FaDownload /> Export to Excel
//             </button>
//             <Link to="/expert/dashboard">
//               <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition flex items-center gap-2 text-base md:text-lg">
//                 <IoMdArrowRoundBack /> Back
//               </button>
//             </Link>
//           </div>
//         </div>

//         {showFilters && (
//           <div className="mb-6 bg-white p-4 rounded-md shadow">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
//               {Object.keys(filters).map((key) => (
//                 <input
//                   key={key}
//                   type="text"
//                   name={key}
//                   placeholder={`Search by ${key}`}
//                   value={filters[key]}
//                   onChange={handleFilterChange}
//                   className="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               ))}
//             </div>
//             {/* Replace inline DateRangePicker with DateRangeFilter component */}
//             <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
//             <div className="flex gap-2 justify-end mt-4">
//               <button
//                 onClick={handleReset}
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition text-base"
//               >
//                 Reset Filters
//               </button>
//             </div>
//           </div>
//         )}

//         {loading ? (
//           <p className="text-center text-blue-600 text-lg">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-600 text-lg">{error}</p>
//         ) : filteredAppointments.length === 0 ? (
//           <p className="text-center text-yellow-600 text-lg">No Appointments Found</p>
//         ) : (
//           <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
//             <table className="w-full table-fixed border-collapse border border-gray-300">
//               <thead className="bg-gray-800 text-white">
//                 <tr>
//                   {[
//                     "No.",
//                     "Created At",
//                     "First Name",
//                     "Last Name",
//                     "Email",
//                     "Mobile Number",
//                     "City",
//                     "PinCode",
//                     "Address",
//                     "Message",
//                     "Remark",
//                     "Status",
//                   ].map((header) => (
//                     <th
//                       key={header}
//                       className="px-6 py-3 border-b border-gray-200 text-sm font-semibold"
//                     >
//                       {header}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredAppointments.map((appointment, index) => (
//                   <tr
//                     key={appointment._id}
//                     className={`border-t ${
//                       index % 2 === 0 ? "bg-white" : "bg-gray-200"
//                     } hover:bg-gray-300 transition-colors`}
//                   >
//                     <td className="px-3 py-2 border text-md truncate">{index + 1}</td>
//                     <td className="px-3 py-2 border text-md truncate">
//                       {new Date(appointment.createdAt).toLocaleDateString("en-GB")}
//                     </td>
//                     <td className="px-3 py-2 border text-md truncate">
//                       {highlightMatch(appointment.FirstName, "FirstName")}
//                     </td>
//                     <td className="px-3 py-2 border text-md truncate">
//                       {highlightMatch(appointment.LastName, "LastName")}
//                     </td>
//                     <td className="px-3 py-2 border text-md truncate">
//                       {highlightMatch(appointment.email, "email")}
//                     </td>
//                     <td className="px-3 py-2 border text-md truncate">
//                       {highlightMatch(appointment.MobileNumber, "MobileNumber")}
//                     </td>
//                     <td className="px-3 py-2 border text-md truncate">
//                       {highlightMatch(appointment.City, "City")}
//                     </td>
//                     <td className="px-3 py-2 border text-md truncate">
//                       {highlightMatch(appointment.PinCode, "PinCode")}
//                     </td>
//                     <td className="px-3 py-2 border text-md truncate">
//                       {highlightMatch(appointment.Address, "Address")}
//                     </td>
//                     <td className="px-3 py-2 border text-md truncate">
//                       {highlightMatch(appointment.Message, "Message")}
//                     </td>
//                     <td className="px-3 py-2 border text-md truncate">
//                       {appointment.remark || "N/A"}
//                     </td>
//                     <td className="px-3 py-2 border text-md">
//                       <div className="flex flex-col gap-2">
//                         <select
//                           value={appointment.status || "Pending"}
//                           onChange={(e) => updateStatus(appointment._id, e.target.value)}
//                           className="border rounded px-2 py-1 text-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                         >
//                           <option value="Pending">Pending</option>
//                           <option value="Opened">Opened</option>
//                           <option value="Closed">Closed</option>
//                           <option value="Terminated">Terminated</option>
//                         </select>
//                         <button
//                           onClick={() => openRemarkModal(appointment)}
//                           className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700 text-xs w-full"
//                         >
//                           Add Remark
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       <RemarkModal
//         isOpen={selectedAppointment !== null}
//         onClose={() => setSelectedAppointment(null)}
//         onSave={handleSaveRemark}
//         appointment={selectedAppointment}
//       />

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default AllInquiries;


import React, { useEffect, useState } from "react";
import { FaDownload, FaFilter } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../../common/AdminSaidBar";
import ExportExcel from "../../common/ExportExcel";
import RemarkModal from "../../common/RemarkModal";
import DateRangeFilter from "./DateRangeFilter";

const AllInquiries = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filters, setFilters] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    MobileNumber: "",
    City: "",
    PinCode: "",
    Address: "",
    Message: "",
    status: "",
  });
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });

  // Existing useEffect for fetching appointments (unchanged)
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:3030/appointment/all-appointment");
        const data = await response.json();
        if (data.success) {
          setAppointments(data.data);
          setFilteredAppointments(data.data);
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

  // Existing useEffect for filtering (unchanged)
  useEffect(() => {
    const lowerFilters = Object.fromEntries(
      Object.entries(filters).map(([k, v]) => [k, v.toLowerCase()])
    );

    const filtered = appointments.filter((item) => {
      const matchesText = Object.keys(lowerFilters).every((key) =>
        item[key]?.toString().toLowerCase().includes(lowerFilters[key])
      );

      const itemDate = new Date(item.createdAt);
      const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null;
      const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;

      const matchesDate =
        (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);

      return matchesText && matchesDate;
    });

    setFilteredAppointments(filtered);
  }, [filters, appointments, dateRange]);

  // Existing highlightMatch, updateStatus, handleExport, handleFilterChange (unchanged)
  const highlightMatch = (text, field) => {
    const search = filters[field]?.toLowerCase();
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: text?.toString().replace(regex, `<span class='bg-[#FFCC99]'>$1</span>`),
        }}
      />
    );
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3030/appointment/${id}/status/${newStatus}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success("Status updated successfully!");
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment._id === id ? { ...appointment, status: newStatus } : appointment
          )
        );
      } else {
        toast.error(data.message || "Failed to update status.");
      }
    } catch (error) {
      toast.error("Error updating status.");
    }
  };

  const handleExport = () => {
    ExportExcel(filteredAppointments, "appointments_data.xlsx");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Modified handleReset to only reset text filters (date range reset is handled in DateRangeFilter)
  const handleReset = () => {
    const cleared = Object.fromEntries(Object.keys(filters).map((k) => [k, ""]));
    setFilters(cleared);
  };

  const handleSaveRemark = (remark) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment._id === selectedAppointment._id ? { ...appointment, remark } : appointment
      )
    );
    setSelectedAppointment(null);
  };

  const openRemarkModal = (appointment) => {
    setSelectedAppointment(appointment);
  };

  return (
    <div className="flex bg-white flex-col md:flex-row min-h-screen">
      <div>
        <AdminSidebar />
      </div>

      <div className="flex-1 px-4 md:px-6 py-6 pt-44  ">
        <div className="flex justify-end items-center mb-6 flex-wrap gap-3">
          <div className="flex gap-2">
            <button
              className="bg-[#f3993f]  hover:bg-orange-500 px-4 py-2 rounded text-white transition flex items-center gap-2 text-base md:text-lg"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <FaFilter className=" " /> {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button
               className="bg-[#f3993f]  hover:bg-orange-500 px-4 py-2 rounded text-white transition flex items-center gap-2 text-base md:text-lg"
              onClick={handleExport}
            >
              <FaDownload className="" /> Export to Excel
            </button>
            <Link to="/expert/dashboard">
              <button  className="bg-[#f3993f]  hover:bg-orange-500 px-4 py-2 rounded text-white transition flex items-center gap-2 text-base md:text-lg">
                <IoMdArrowRoundBack  /> Back
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
                  className="border border-[#FF6600] rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-[#FF9933] placeholder-[#FF9933]"
                />
              ))}
            </div>
            {/* Replace inline DateRangePicker with DateRangeFilter component */}
            <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={handleReset}
                className="bg-white text-[#FF9933] px-4 py-2 rounded hover:bg-[#FFCC99] transition text-base"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-center text-[#FF9933] text-lg">Loading...</p>
        ) : error ? (
          <p className="text-center text-[#FF9933] text-lg">{error}</p>
        ) : filteredAppointments.length === 0 ? (
          <p className="text-center text-[#FF9933] text-lg">No Appointments Found</p>
        ) : (
          <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <table className="w-full table-fixed border-collapse border border-orange-200 bg-white">
              <thead>
                <tr className="bg-orange-500 text-white font-medium">
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
                    "Remark",
                    "Status",
                  ].map((header) => (
                    <th
                      key={header}
               className="px-3 py-2 border border-[#FF6600] text-lg truncate "
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment, index) => (
                  <tr
                    key={appointment._id}
                    className={`border-t ${
                      index % 2 === 0 ? "bg-white" : "bg-[#FFF5E6]"
                    }  transition-colors`}
                  >
                    <td className="px-3 py-2 border border-[#FF6600] text-md truncate text-[#3f3e3d] font-bold">{index + 1}</td>
                    <td className="px-3 py-2 border border-[#FF6600] text-md truncate  text-[#3f3e3d] font-bold">
                      {new Date(appointment.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-md truncate  text-[#3f3e3d] font-bold">
                      {highlightMatch(appointment.FirstName, "FirstName")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-md truncate  text-[#3f3e3d] font-bold">
                      {highlightMatch(appointment.LastName, "LastName")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-md truncate  text-[#3f3e3d] font-bold">
                      {highlightMatch(appointment.email, "email")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-md truncate  text-[#3f3e3d] font-bold">
                      {highlightMatch(appointment.MobileNumber, "MobileNumber")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-md truncate  text-[#3f3e3d] font-bold">
                      {highlightMatch(appointment.City, "City")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-md truncate  text-[#3f3e3d] font-bold">
                      {highlightMatch(appointment.PinCode, "PinCode")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-md truncate  text-[#3f3e3d] font-bold">
                      {highlightMatch(appointment.Address, "Address")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-md truncate  text-[#3f3e3d] font-bold">
                      {highlightMatch(appointment.Message, "Message")}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-md truncate  text-[#3f3e3d] font-bold">
                      {appointment.remark || "N/A"}
                    </td>
                    <td className="px-3 py-2 border border-[#FF6600] text-md">
                      <div className="flex flex-col gap-2">
                        <select
                          value={appointment.status || "Pending"}
                          onChange={(e) => updateStatus(appointment._id, e.target.value)}
                          className="border border-[#FF6600] rounded px-2 py-1 text-md  text-[#3f3e3d] font-bold bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6600] w-full"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Opened">Opened</option>
                          <option value="Closed">Closed</option>
                          <option value="Terminated">Terminated</option>
                        </select>
                        <button
                          onClick={() => openRemarkModal(appointment)}
                          className="bg-orange-500 text-white font-bold px-2 py-1 rounded text-sm w-full"
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

export default AllInquiries;