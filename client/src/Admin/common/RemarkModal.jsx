import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const RemarkModal = ({ isOpen, onClose, onSave, appointment }) => {
  const [remark, setRemark] = useState("");

  useEffect(() => {
    if (appointment) {
      setRemark(appointment.remark || "");
    }
  }, [appointment]);

  const handleSave = async () => {
    if (!remark.trim()) {
      toast.warn("Please enter a remark before saving.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3030/appointment/remark/${appointment._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ remark }),
      });

      const data = await response.json();
      if (data.success) {
        onSave(remark); // Update the remark in the parent component
        toast.success("Remark added successfully!");
      } else {
        toast.error(data.message || "Failed to save remark.");
      }
    } catch (err) {
      toast.error("Error saving remark.");
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-[#3f3e3d]">Add Remark</h2>
        <textarea
          rows={4}
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="w-full border border-[#FF6600] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-[#3f3e3d] font-bold placeholder-[#FF9933]"
          placeholder="Enter your remark here..."
        ></textarea>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-white text-[#3f3e3d] font-bold px-4 py-2 rounded hover:bg-[#FFCC99]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-white text-[#3f3e3d] font-bold px-4 py-2 rounded hover:bg-[#FFCC99]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default RemarkModal;