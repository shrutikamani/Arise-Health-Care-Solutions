// import React, { useState } from 'react';
// import { FaFilter, FaFileExcel, FaArrowLeft } from 'react-icons/fa';

// const InquiryFilter = () => {
//   const [showFilters, setShowFilters] = useState(true);

//   const toggleFilters = () => {
//     setShowFilters(!showFilters);
//   };

//   return (
//     <div className="p-4">
        
//       {/* Filter Inputs - Only show if toggle is true */}
//       {showFilters && (
//         <div className="bg-white shadow-md rounded-md p-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//             <input className="border border-gray-300 rounded px-4 py-2 w-full" placeholder="Search by FirstName" />
//             <input className="border border-gray-300 rounded px-4 py-2 w-full" placeholder="Search by LastName" />
//             <input className="border border-gray-300 rounded px-4 py-2 w-full" placeholder="Search by email" />
//             <input className="border border-gray-300 rounded px-4 py-2 w-full" placeholder="Search by MobileNumber" />
//             <input className="border border-gray-300 rounded px-4 py-2 w-full" placeholder="Search by City" />
//             <input className="border border-gray-300 rounded px-4 py-2 w-full" placeholder="Search by PinCode" />
//             <input className="border border-gray-300 rounded px-4 py-2 w-full" placeholder="Search by Address" />
//             <input className="border border-gray-300 rounded px-4 py-2 w-full" placeholder="Search by Message" />
//             {/* <input className="border border-gray-300 rounded px-4 py-2 w-full" placeholder="Search by status" /> */}
//           </div>

//           {/* Reset Button */}
//           <div className="flex justify-end mt-4">
//             <button className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700">
//               Reset
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InquiryFilter;
