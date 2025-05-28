
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSaidBar from "../../common/AdminSaidBar"; // Adjust the import path as necessary

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3030/payment/all-orders", {
          withCredentials: true,
        });
        console.log("Orders response:", JSON.stringify(res.data, null, 2));
        setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        const errorMsg = err.response?.data?.error || "Failed to fetch orders";
        setError(errorMsg);
        toast.error(errorMsg, { position: "top-right" });
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:3030/payment/order/${orderId}/status`,
        { orderStatus: newStatus },
        { withCredentials: true }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
      toast.success("Order status updated successfully", { position: "top-right" });
    } catch (err) {
      console.error("Failed to update order status:", err);
      const errorMsg = err.response?.data?.error || "Failed to update order status";
      toast.error(errorMsg, { position: "top-right" });
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="text-saffron">
        <AdminSaidBar />
      </div>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 mt-44 bg-white">
        <ToastContainer position="top-right" autoClose={5000} />
        <h2 className="text-2xl items-center sm:text-2xl font-bold text-md text-orange-500">
          All Orders
        </h2>

        {loading ? (
          <p className="text-orange-500 text-center font-bold text-md">Loading orders...</p>
        ) : error ? (
          <p className="text-orange-500 text-center font-bold text-md">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-orange-500 text-center font-bold text-md">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-saffron text-md">
              <thead className="bg-saffron-light text-white">
                <tr>
                  <th className="px-4 sm:px-4 py-2 border border-saffron bg-orange-500 font-bold text-md">
                    Order ID
                  </th>
                  <th className="px-4 sm:px-4 py-2 border border-saffron bg-orange-500 font-bold text-md">
                    Customer Name
                  </th>
                  <th className="px-4 sm:px-4 py-2 border border-saffron bg-orange-500 font-bold text-md">
                    Items
                  </th>
                  <th className="px-4 sm:px-4 py-2 border border-saffron bg-orange-500 font-bold text-md">
                    Shipping Address
                  </th>
                  <th className="px-4 sm:px-4 py-2 border border-saffron bg-orange-500 font-bold text-md">
                    Amount (₹)
                  </th>
                  <th className="px-4 sm:px-4 py-2 border border-saffron bg-orange-500 font-bold text-md">
                    Payment ID
                  </th>
                  <th className="px-4 sm:px-4 py-2 border border-saffron bg-orange-500 font-bold text-md">
                    Razorpay Order ID
                  </th>
                  <th className="px-4 sm:px-4 py-2 border border-saffron bg-orange-500 font-bold text-md">
                    Payment Status
                  </th>
                  <th className="px-4 sm:px-4 py-2 border border-saffron bg-orange-500 font-bold text-md">
                    Order Status
                  </th>
                  <th className="px-4 sm:px-4 py-2 border border-saffron bg-orange-500 font-bold text-md">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-saffron-very light"}
                  >
                    <td className="px-2 sm:px-4 py-2 border border-saffron text-[#3f3e3d] font-bold text-md">
                      {order.orderId || order._id}
                    </td>
                    <td className="px-2 sm:px-4 py-2 border border-saffron text-[#3f3e3d] font-bold text-md">
                      {order.customerId && typeof order.customerId === "object"
                        ? order.customerId.email || "N/A"
                        : order.shippingAddress?.fullName || "N/A"}
                    </td>
                    <td className="px-2 sm:px-4 py-2 border border-saffron text-[#3f3e3d] font-bold text-md">
                      {order.items?.length ? (
                        <ul className="list-disc list-inside">
                          {order.items.map((item, idx) => (
                            <li key={idx}>
                              {item.title} (Qty: {item.quantity}, ₹
                              {(item.price).toFixed(2)})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-2 sm:px-4 py-2 border border-saffron text-[#3f3e3d] font-bold text-md">
                      {order.shippingAddress ? (
                        <div>
                          <p>{order.shippingAddress.fullName}</p>
                          <p>{order.shippingAddress.address}</p>
                          <p>
                            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                            {order.shippingAddress.pincode}
                          </p>
                          <p>{order.shippingAddress.country}</p>
                          <p>{order.shippingAddress.phoneNumber}</p>
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-2 sm:px-4 py-2 border border-saffron text-[#3f3e3d] font-bold text-md">
                      ₹{(order.totalAmount).toFixed(2)}
                    </td>
                    <td className="px-2 sm:px-4 py-2 border border-saffron text-[#3f3e3d] font-bold text-md">
                      {order.razorpayPaymentId || "N/A"}
                    </td>
                    <td className="px-2 sm:px-4 py-2 border border-saffron text-[#3f3e3d] font-bold text-md">
                      {order.razorpayOrderId || "N/A"}
                    </td>
                    <td className="px-2 sm:px-4 py-2 border border-saffron text-[#3f3e3d] font-bold text-md">
                      {order.paymentStatus}
                    </td>
                    <td className="px-2 sm:px-4 py-2 border border-saffron text-[#3f3e3d] font-bold text-md">
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleOrderStatusChange(order._id, e.target.value)
                        }
                        className="border border-saffron rounded px-2 py-1 text-md w-full bg-white text-[#3f3e3d] font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-2 sm:px-4 py-2 border border-saffron text-[#3f3e3d] font-bold text-md">
                      {new Date(order.orderDate).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;