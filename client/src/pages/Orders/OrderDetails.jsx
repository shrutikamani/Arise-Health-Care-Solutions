// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const OrderDetails = () =>
// {
//   const { userId, orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [cancelLoading, setCancelLoading] = useState(false);

// useEffect(() =>
// {
//   const fetchOrderDetails = async () =>
//   {
//     try {
//       const effectiveUserId = userId || localStorage.getItem("userId");

//       if (!effectiveUserId || !/^[0-9a-fA-F]{24}$/.test(effectiveUserId)) {
//         setError(`Invalid or missing User ID: ${effectiveUserId || "undefined"}`);
//         setLoading(false);
//         return;
//       }

//       if (!orderId) {
//         setError("Invalid or missing Order ID");
//         setLoading(false);
//         return;
//       }

//       const response = await axios.get(`http://localhost:3030/payment/order/${customerId}`, {
//         params: { userId: effectiveUserId },
//       });

//       console.log("API Response:", response.data); // Debug: Log the response

//       if (response.data.success && response.data.order) {
//         // Ensure items is an array, default to empty array if undefined
//         const orderData = {
//           ...response.data.order,
//           items: Array.isArray(response.data.order.items)
//             ? response.data.order.items
//             : [],
//         };
//         setOrder(orderData);
//       } else {
//         setError("No order found");
//       }
//     } catch (error) {
//       console.error("❌ Error fetching order details:", error);
//       setError(error.response?.data?.error || "Failed to fetch order details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchOrderDetails();
// }, [userId, orderId]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-lg text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-red-500 text-lg">Error: {error}</div>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-gray-600 text-lg">No order found</div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 py-6 sm:py-12">
//       <div className="max-w-7xl mx-auto px-4">
//         <h3 className="text-3xl font-bold text-gray-800 mb-8">Order Details</h3>

//         <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">
//           {/* Products */}
//           <div className="flex-1 bg-gray-50 p-4 rounded-md">
//             <h4 className="text-xl font-semibold text-gray-700 mb-4">Products</h4>
//             <div className="space-y-4">
//               {Array.isArray(order.items) && order.items.length > 0 ? (
//                 order.items.map((item, index) => (
//                   <div>
//                     <p className="font-semibold text-lg capitalize text-gray-800">{item.title}</p>
//                     <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
//                     <p className="text-gray-600 text-sm">Price: ₹{(item.price / 100).toFixed(2)}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-600">No items in this order</p>
//               )}
//             </div>
//           </div>

//           {/* Order Information */}
//           <div className="flex-1 bg-gray-50 p-4 rounded-xl">
//             <h4 className="text-lg font-semibold text-gray-700 mb-4">Order Information</h4>
//             <div className="space-y-2 text-gray-600 text-sm">
//               <div className="flex justify-between">
//                 <span className="font-medium">Order ID:</span>
//                 <span>{order.orderId || "N/A (COD Order)"}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="font-medium">Date:</span>
//                 <span>{new Date(order.orderDate).toLocaleDateString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="font-medium">Status:</span>
//                 <span
//                   className={`font-bold ${order.paymentStatus === "paid"
//                       ? "text-green-600"
//                       : order.paymentStatus === "pending"
//                         ? "text-yellow-600"
//                         : order.paymentStatus === "cancelled"
//                           ? "text-gray-600"
//                           : "text-red-600"
//                     }`}
//                 >
//                   {order.paymentStatus ? order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1) : "Unknown"}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="font-medium">Total Amount:</span>
//                 <span>₹{(order.totalAmount ).toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           {/* Shipping Address */}
//           <div className="flex-1 bg-gray-50 p-4 rounded-md">
//             <h4 className="text-lg font-semibold text-gray-700 mb-4">Shipping Address</h4>
//             <div className="space-y-2 text-gray-600 text-sm">
//               <p>{order.shippingAddress.fullName}</p>
//               <p>{order.shippingAddress.phoneNumber}</p>
//               <p>{order.shippingAddress.address}</p>
//               <p>
//                 {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
//                 {order.shippingAddress.pincode}
//               </p>
//               <p>{order.shippingAddress.country}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderDetails = () =>
{
  const { userId, orderId } = useParams();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() =>
  {
    const fetchOrders = async () =>
    {
      try {
        const effectiveUserId = userId || localStorage.getItem("userId");

        if (!effectiveUserId || !/^[0-9a-fA-F]{24}$/.test(effectiveUserId)) {
          setError(`Invalid or missing Customer ID: ${effectiveUserId || "undefined"}`);
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:3030/payment/order/${effectiveUserId}`);

        if (response.data.success && Array.isArray(response.data.orders)) {
          const userOrders = response.data.orders.map((order) => ({
            ...order,
            items: Array.isArray(order.items) ? order.items : [],
          }));
          setOrders(userOrders);

          const foundOrder =
            userOrders.find((o) => o._id === orderId || o.orderId === orderId) || userOrders[0];
          setSelectedOrder(foundOrder);
        } else {
          setError("No orders found for this customer.");
        }
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError(err.response?.data?.error || "Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, orderId]);

  // const handleCancelOrder = async () =>
  // {
  //   if (!selectedOrder || cancelLoading) return;

  //   try {
  //     setCancelLoading(true);
  //     const response = await axios.put(
  //       `http://localhost:3030/order/${selectedOrder._id}/status`,
  //       { orderStatus: "cancelled" }
  //     );

  //     if (response.data.success) {
  //       const updatedOrders = orders.map((order) =>
  //         order._id === selectedOrder._id
  //           ? { ...order, orderStatus: "cancelled", paymentStatus: "cancelled" }
  //           : order
  //       );
  //       setOrders(updatedOrders);
  //       setSelectedOrder({ ...selectedOrder, orderStatus: "cancelled", paymentStatus: "cancelled" });
  //       alert("Order cancelled successfully.");
  //     } else {
  //       setError("Failed to cancel order");
  //     }
  //   } catch (err) {
  //     console.error("❌ Cancel order error:", err);
  //     setError(err.response?.data?.error || "Failed to cancel order");
  //   } finally {
  //     setCancelLoading(false);
  //   }
  // };

  if (loading) return <div className="text-center py-8 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 h-auto min-h-screen  pt-24">
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-white shadow rounded-lg p-4 h-fit">
          <h3 className="font-semibold mb-3">All Orders</h3>
          <ul className="space-y-2">
            {orders.map((order) => (
              <li
                key={order._id}
                className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${selectedOrder?._id === order._id ? "bg-blue-100 font-semibold" : ""
                  }`}
                onClick={() => setSelectedOrder(order)}
              >
                {order.orderId || "COD Order"} -{" "}
                <span className="text-sm text-gray-500">
                  ₹{(order.totalAmount).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {selectedOrder && (
          <div className="md:col-span-3 bg-white shadow rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-bold">Order Summary</h3>

            {/* Products */}
            <div>
              <h4 className="font-semibold mb-2">Items</h4>
              <div className="space-y-4">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 border p-3 rounded">
                    {/* {item.images && (
                      // <img
                      //   src={
                      //     item.images.startsWith("http")
                      //       ? item.images
                      //       : `http://localhost:3030${item.images}`
                      //   }
                      //   className="w-16 h-16 object-cover rounded"
                      //   alt={item.title}
                      // />
                      <img
                        src={
                          item.images?.[0]
                            ? item.images[0].startsWith("http")
                              ? item.images[0]
                              : `/uploads/${item.images[0]}`
                            : "/placeholder.jpg"
                        }
                        alt={item.name || "Product"}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )} */}
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-500">
                        ₹{(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <h4 className="font-semibold mb-2">Order Info</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div>Order ID:</div>
                <div>{selectedOrder.orderId || "N/A"}</div>
                <div>Status:</div>
                <div
                  className={`font-bold ${selectedOrder.paymentStatus === "paid"
                      ? "text-green-600"
                      : selectedOrder.paymentStatus === "pending"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }`}
                >
                  {selectedOrder.paymentStatus}
                </div>
                <div>Total:</div>
                <div>₹{(selectedOrder.totalAmount).toFixed(2)}</div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-semibold mb-2">Shipping Address</h4>
              <div className="text-sm text-gray-700 space-y-1">
                <p>{selectedOrder.shippingAddress.fullName}</p>
                <p>{selectedOrder.shippingAddress.phoneNumber}</p>
                <p>{selectedOrder.shippingAddress.address}</p>
                <p>
                  {selectedOrder.shippingAddress.city},{" "}
                  {selectedOrder.shippingAddress.state}{" "}
                  {selectedOrder.shippingAddress.pincode}
                </p>
              </div>
            </div>

            {/* Cancel */}
           
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default OrderDetails;
