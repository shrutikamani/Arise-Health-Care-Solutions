import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../redux/slices/Product-slice/cartSlice";
import { setShippingAddress } from "../../../redux/slices/Order-slice/orderSlice";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart?.items || []);
  const shippingAddress = useSelector((state) => state.order?.shippingAddress || {});
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(shippingAddress);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay SDK
  useEffect(() => {
    const loadRazorpayScript = () => {
      if (window.Razorpay) {
        setRazorpayLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      script.onerror = () => {
        setError("Failed to load Razorpay SDK. Please check your internet connection.");
        setRazorpayLoaded(false);
      };
      document.body.appendChild(script);
    };

    loadRazorpayScript();

    return () => {
      const scripts = document.querySelectorAll('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      scripts.forEach((script) => script.remove());
    };
  }, []);

  useEffect(() => {
    if (!userId) {
      navigate("/cart");
    }
  }, [userId, navigate]);

  useEffect(() => {
    setAddressForm(shippingAddress);
  }, [shippingAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: value,
    });
  };

  const handleSaveAddress = () => {
    const requiredFields = [
      "fullName",
      "phoneNumber",
      "pincode",
      "address",
      "city",
      "state",
      "country",
    ];
    const missingFields = requiredFields.filter((field) => !addressForm[field]?.trim());
    if (missingFields.length) {
      setError(`Please fill in all required address fields: ${missingFields.join(", ")}`);
      return;
    }

    dispatch(setShippingAddress(addressForm));
    setIsEditingAddress(false);
  };


  const handlePayment = async () => {
    if (cartItems.length === 0) {
      setError("Cart is empty. Please add items to your cart.");
      return;
    }
  
    // Log cartItems for debugging
    console.log("Cart Items:", JSON.stringify(cartItems, null, 2));
  
    // Validate cart items
    const invalidItems = cartItems.filter(
      (item) =>
        !item._id ||
        !item.title ||
        typeof item.title !== "string" ||
        !Number.isFinite(item.price) ||
        !Number.isFinite(item.quantity) ||
        (item.images && !Array.isArray(item.images) && typeof item.images !== "string")
    );
    if (invalidItems.length > 0) {
      console.log("Invalid Items:", JSON.stringify(invalidItems, null, 2));
      setError("Some cart items have invalid data. Please check your cart.");
      return;
    }
  
    // Validate shipping address
    const requiredFields = [
      "fullName",
      "phoneNumber",
      "pincode",
      "address",
      "city",
      "state",
      "country",
    ];
    const missingFields = requiredFields.filter((field) => !shippingAddress[field]?.trim());
    if (missingFields.length) {
      setError(`Please fill in all required address fields: ${missingFields.join(", ")}`);
      setIsEditingAddress(true);
      return;
    }
  
    // Prepare items for the backend
    const items = cartItems.map((item) => ({
      productId: item._id,
      title: item.title,
      price: item.price, // Send in rupees
      quantity: item.quantity,
      images: Array.isArray(item.images) ? item.images[0] : item.images || undefined, // Take first image or set to undefined
    }));
  
    // Prepare shipping address
    const shippingAddressPayload = {
      fullName: shippingAddress.fullName,
      phoneNumber: shippingAddress.phoneNumber,
      pincode: shippingAddress.pincode,
      address: shippingAddress.address,
      city: shippingAddress.city,
      state: shippingAddress.state,
      country: shippingAddress.country,
    };
  
    // Prepare order payload
    const orderPayload = {
      customerId: userId, // Changed to customerId to match backend
      totalAmount, // Send in rupees
      items,
      shippingAddress: shippingAddressPayload,
    };
  
    setLoading(true);
    setError(null);
  
    // console.log("Order Payload:", JSON.stringify(orderPayload, null, 2)); // Debug log
  
    const API_URL = "http://localhost:3030";
    const RAZORPAY_KEY = "rzp_test_hVNyQmIkE3244M";
  
    if (paymentMethod === "UPI") {
      if (!razorpayLoaded || !window.Razorpay) {
        setError("Razorpay SDK not loaded. Please try again.");
        setLoading(false);
        return;
      }
  
      try {
        // Step 1: Create Razorpay order
        const { data: order } = await axios.post(
          `${API_URL}/payment/checkout`,
          { totalAmount } // Send in rupees
        );
  
        // Step 2: Initialize Razorpay
        const options = {
          key: RAZORPAY_KEY,
          amount: order.amount, // Amount in paise from backend
          currency: order.currency,
          order_id: order.id,
          name: "Your Company Name",
          description: "Order Payment",
          handler: async (response) => {
            try {
              // Step 3: Verify payment
              const verifyResponse = await axios.post(
                `${API_URL}/payment/verify`,
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  totalAmount,
                  items,
                  customerId: userId,
                  shippingAddress: shippingAddressPayload,
                }
              );
  
              if (verifyResponse.data.success) {
                dispatch(clearCart());
                navigate(`/orders/${verifyResponse.data.customerId || userId}`);
              } else {
                setError("Payment verification failed: " + verifyResponse.data.message);
              }
            } catch (err) {
              console.error("Verification error:", err);
              setError("Payment verification failed: " + err.message);
            }
          },
          prefill: {
            name: shippingAddress.fullName || "",
            contact: shippingAddress.phoneNumber || "",
          },
          theme: {
            color: "#3399cc",
          },
        };
  
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (err) {
        console.error("Checkout error:", err);
        setError("Failed to initiate payment: " + err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // COD: Create order
      try {
        const response = await axios.post(
          `${API_URL}/payment/cod`,
          orderPayload
        );
  
        if (response.data.success) {
          dispatch(clearCart());
          navigate(`/orders/${response.data.customerId || userId}`);
        } else {
          setError("Failed to create COD order: " + response.data.message);
        }
      } catch (err) {
        console.error("COD error:", err);
        setError("Failed to create COD order: " + err.message);
      } finally {
        setLoading(false);
      }
    }
  };
  if (!userId) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen mt-20 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 max-w-full sm:max-w-xl lg:max-w-3xl 2xl:max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-6 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">Verify Your Order</h1>

            <div className="divide divide-gray-200">
              <div className="py-8 text-xl leading-6 space-y-4 text-gray-900 sm:text-xl sm:leading-7">
                <div className="flex items-center  justify-between">
                  <span>Total Items:</span>
                  <span className="font-semibold">{cartItems.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Amount:</span>
                  <span className="font-semibold">₹{totalAmount}</span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span>Shipping Address:</span>
                    {!isEditingAddress && (
                      <button
                        onClick={() => setIsEditingAddress(true)}
                        className="text-blue-500 hover:text-blue-700 text-lg"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  {isEditingAddress ? (
                    <div className="mt-2 space-y-2">
                      <div>
                        <label className="block text-md font-medium text-gray-700">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={addressForm.fullName || ""}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-md font-medium text-gray-700">Phone Number</label>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={addressForm.phoneNumber || ""}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-md font-medium text-gray-700">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={addressForm.address || ""}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-md font-medium text-gray-700">City</label>
                          <input
                            type="text"
                            name="city"
                            value={addressForm.city || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-md font-medium text-gray-700">State</label>
                          <input
                            type="text"
                            name="state"
                            value={addressForm.state || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-md font-medium text-gray-700">Pincode</label>
                          <input
                            type="text"
                            name="pincode"
                            value={addressForm.pincode || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-md font-medium text-gray-700">Country</label>
                          <input
                            type="text"
                            name="country"
                            value={addressForm.country || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-3">
                        <button
                          onClick={() => setIsEditingAddress(false)}
                          className="py-1 px-3 bg-gray-200 hover:bg-gray-300 rounded-md"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveAddress}
                          className="py-1 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 text-right">
                      <p className="font-semibold">{shippingAddress.fullName || "Not set"}</p>
                      <p>{shippingAddress.phoneNumber || "Not set"}</p>
                      <p>{shippingAddress.address || "Not set"}</p>
                      <p>
                        {shippingAddress.city || "Not set"}, {shippingAddress.state || "Not set"} {shippingAddress.pincode || "Not set"}
                      </p>
                      <p>{shippingAddress.country || "Not set"}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col  ">
                  <span className="font-semibold text-xl">Payment Method:</span>
                  <div className="mt-2 ">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI"
                        checked={paymentMethod === "UPI"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="form-radio"
                      />
                      <span className="ml-2">UPI</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="form-radio"
                      />
                      <span className="ml-2">Cash on Delivery</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>User ID:</span>
                  <span className="font-semibold">{userId}</span>
                </div>
              </div>

              {error && <div className="text-red-500 mb-4">{error}</div>}

              <div className="pt-6 text-base font-bold leading-6 sm:text-lg sm:leading-7">
                <button
                  onClick={handlePayment}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none"
                  disabled={isEditingAddress || loading}
                >
                  {loading
                    ? "Processing..."
                    : paymentMethod === "COD"
                    ? "Place Order"
                    : "Pay Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;  