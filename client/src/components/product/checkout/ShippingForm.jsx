import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShippingAddress } from '../../../redux/slices/Order-slice/orderSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShippingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    phoneNumber: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const storedUserId = localStorage.getItem('userId');
    const payload = { ...formData };
    if (storedUserId) {
      payload.userId = storedUserId;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3030/address/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success && data.userId) {
        localStorage.setItem('userId', data.userId);

        // Update Redux store
        dispatch(setShippingAddress(formData));

        // Show success toast
        toast.success("Address added successfully!", { position: "top-right" });

        // Navigate to checkout
        navigate(`/checkout?userId=${data.userId}`);
      } else {
        let errorMsg = data.message || "Failed to save address";
        if (data.errors) {
          const errorDetails = Object.entries(data.errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ');
          errorMsg = `${data.message}: ${errorDetails}`;
        }
        setErrorMessage(errorMsg);
        toast.error(errorMsg, { position: "top-right" });
      }
    } catch (error) {
      console.error("Error submitting address:", error);
      const errorMsg = "Server error. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg, { position: "top-right" });
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Address</h2>

        {errorMessage && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter your full name", minLength: 2, maxLength: 100 },
              { label: "Phone Number", name: "phoneNumber", type: "text", placeholder: "Enter phone number", pattern: "[6-9][0-9]{9}", title: "Phone number must be a 10-digit Indian number starting with 6-9" },
              { label: "Address", name: "address", type: "text", placeholder: "Enter full address", minLength: 5 },
              { label: "City", name: "city", type: "text", placeholder: "Enter city" },
              { label: "State", name: "state", type: "text", placeholder: "Enter state" },
              { label: "Pincode", name: "pincode", type: "text", placeholder: "Enter pincode", pattern: "[1-9][0-9]{5}", title: "Pincode must be a 6-digit number starting with 1-9" },
              { label: "Country", name: "country", type: "text", placeholder: "Enter country" },
            ].map(({ label, name, type, placeholder, minLength, maxLength, pattern, title }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-lg font-bold text-black mb-1">
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full text-lg border border-gray-600 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={minLength}
                  maxLength={maxLength}
                  pattern={pattern}
                  title={title}
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 py-3 px-6 rounded-md text-white text-lg font-medium transition ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Save & Proceed to Checkout"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingForm;
