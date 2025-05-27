import React from "react";

const InquiryTable = ({ inquiries, status }) => {
  // Helper for status badge color
  const getStatusColor = (status) => {
    if (status === "Closed") return "bg-orange-500";
    return "bg-orange-700";
  };

  return (
    <div className="table-responsive bg-white p-4 rounded shadow">
      <table className="w-full text-[18px] border-collapse border border-orange-200 bg-white">
        <thead>
          <tr className="bg-orange-600 text-white">
            <th className="p-2.5 border border-orange-200">No.</th>
            <th className="p-2.5 border border-orange-200">Created At</th>
            <th className="p-2.5 border border-orange-200">First Name</th>
            <th className="p-2.5 border border-orange-200">Last Name</th>
            <th className="p-2.5 border border-orange-200">Email</th>
            <th className="p-2.5 border border-orange-200">Mobile Number</th>
            <th className="p-2.5 border border-orange-200">City</th>
            <th className="p-2.5 border border-orange-200">Pin Code</th>
            <th className="p-2.5 border border-orange-200">Address</th>
            <th className="p-2.5 border border-orange-200">Message</th>
            <th className="p-2.5 border border-orange-200">Status</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry, index) => (
            <tr key={inquiry._id} className="border-t hover:bg-orange-50 text-orange-700">
              <td className="p-2 border border-orange-200">{index + 1}</td>
              <td className="p-2 border border-orange-200">
                {new Date(inquiry.createdAt).toLocaleDateString('en-GB')}
              </td>
              <td className="p-2 border border-orange-200">{inquiry.FirstName}</td>
              <td className="p-2 border border-orange-200">{inquiry.LastName}</td>
              <td className="p-2 border border-orange-200">{inquiry.email}</td>
              <td className="p-2 border border-orange-200">{inquiry.MobileNumber}</td>
              <td className="p-2 border border-orange-200">{inquiry.City}</td>
              <td className="p-2 border border-orange-200">{inquiry.PinCode}</td>
              <td className="p-2 border border-orange-200">{inquiry.Address}</td>
              <td className="p-2 border border-orange-200">{inquiry.Message}</td>
              <td className="text-center border border-orange-200">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold ${getStatusColor(status)}`}
                >
                  {status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InquiryTable;
