// import Razorpay from "razorpay";
// import crypto from "crypto";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { Payment } from "../models/Payment.js";

// dotenv.config();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export const checkout = async (req, res) => {
//   try {
//     const { totalAmount } = req.body;
//     if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
//       return res.status(400).json({ error: "Invalid or missing totalAmount" });
//     }

//     const order = await razorpay.orders.create({
//       amount: Math.round(Number(totalAmount) * 100), // Amount in paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     });

//     res.status(200).json(order);
//   } catch (err) {
//     console.error("Checkout Error:", err);
//     res.status(500).json({ error: "Checkout failed", details: err.message });
//   }
// };

// export const verify = async (req, res) => {
//   try {
//     console.log("Verify Request Body:", JSON.stringify(req.body, null, 2));

//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       totalAmount,
//       items,
//       userId,
//       shippingAddress,
//     } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing Razorpay payment details",
//       });
//     }

//     if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or missing totalAmount",
//       });
//     }

//     const requiredFields = [
//       "fullName",
//       "address",
//       "city",
//       "state",
//       "country",
//       "pincode",
//       "phoneNumber",
//     ];
//     const missingFields = requiredFields.filter(
//       (field) => !shippingAddress?.[field]
//     );
//     if (missingFields.length) {
//       return res.status(400).json({
//         success: false,
//         message: `Missing shipping fields: ${missingFields.join(", ")}`,
//       });
//     }

//     if (
//       !Array.isArray(items) ||
//       items.length === 0 ||
//       items.some(
//         (item) =>
//           !item.title ||
//           typeof item.title !== "string" ||
//           typeof item.quantity !== "number" ||
//           typeof item.price !== "number" ||
//           !item.productId ||
//           !mongoose.Types.ObjectId.isValid(item.productId) ||
//           (item.images && typeof item.images !== "string")
//       )
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or missing items",
//       });
//     }

//     if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or missing userId",
//       });
//     }

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment signature",
//       });
//     }

//     const paymentData = {
//       orderId: `order_${Date.now()}`,
//       paymentId: razorpay_payment_id,
//       razorpayPaymentId: razorpay_payment_id,
//       razorpayOrderId: razorpay_order_id,
//       signature: razorpay_signature,
//       totalAmount: Number(totalAmount),
//       userId: new mongoose.Types.ObjectId(userId),
//       shippingAddress,
//       items: items.map((item) => ({
//         productId: new mongoose.Types.ObjectId(item.productId),
//         title: item.title,
//         price: item.price,
//         quantity: item.quantity,
//         images: item.images || undefined,
//       })),
//       paymentStatus: "completed",
//       orderStatus: "pending",
//       orderDate: new Date(),
//     };

//     console.log("Payment Data to Save:", JSON.stringify(paymentData, null, 2));
//     const newPayment = await Payment.create(paymentData);
//     console.log("New Payment Created:", JSON.stringify(newPayment, null, 2));

//     res.status(200).json({
//       success: true,
//       message: "Payment verified and recorded successfully",
//       payment: newPayment,
//       userId,
//     });
//   } catch (err) {
//     console.error("Payment Verification Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error during verification",
//       error: err.message,
//     });
//   }
// };

// export const createCODOrder = async (req, res) => {
//   try {
//     const { totalAmount, items, userId, shippingAddress } = req.body;

//     if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or missing totalAmount",
//       });
//     }

//     const requiredFields = [
//       "fullName",
//       "address",
//       "city",
//       "state",
//       "country",
//       "pincode",
//       "phoneNumber",
//     ];
//     const missingFields = requiredFields.filter(
//       (field) => !shippingAddress?.[field]
//     );
//     if (missingFields.length) {
//       return res.status(400).json({
//         success: false,
//         message: `Missing shipping fields: ${missingFields.join(", ")}`,
//       });
//     }

//     if (
//       !Array.isArray(items) ||
//       items.length === 0 ||
//       items.some(
//         (item) =>
//           !item.title ||
//           typeof item.title !== "string" ||
//           typeof item.quantity !== "number" ||
//           typeof item.price !== "number" ||
//           !item.productId ||
//           !mongoose.Types.ObjectId.isValid(item.productId) ||
//           (item.images && typeof item.images !== "string")
//       )
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or missing items",
//       });
//     }

//     if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or missing userId",
//       });
//     }

//     const paymentData = {
//       orderId: `cod_${Date.now()}`,
//       paymentId: null,
//       razorpayPaymentId: null,
//       razorpayOrderId: null,
//       signature: null,
//       totalAmount: Number(totalAmount),
//       userId: new mongoose.Types.ObjectId(userId),
//       shippingAddress,
//       items: items.map((item) => ({
//         productId: new mongoose.Types.ObjectId(item.productId),
//         title: item.title,
//         price: item.price,
//         quantity: item.quantity,
//         images: item.images || undefined,
//       })),
//       paymentStatus: "pending",
//       orderStatus: "pending",
//       orderDate: new Date(),
//     };

//     console.log("COD Payment Data to Save:", JSON.stringify(paymentData, null, 2));
//     const newPayment = await Payment.create(paymentData);
//     console.log("New COD Payment Created:", JSON.stringify(newPayment, null, 2));

//     res.status(201).json({
//       success: true,
//       message: "COD order created successfully",
//       payment: newPayment,
//       userId,
//     });
//   } catch (err) {
//     console.error("COD Order Creation Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error during COD order creation",
//       error: err.message,
//     });
//   }
// };

// export const getOrderByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ success: false, error: "Invalid user ID" });
//     }
//     const order = await Payment.findOne({
//       userId: new mongoose.Types.ObjectId(userId),
//     })
//       .sort({ orderDate: -1 })
//       .populate("userId")
//       .populate("items.productId");
//     if (!order) {
//       return res
//         .status(404)
//         .json({ success: false, error: "No order found for this user" });
//     }
//     res.status(200).json({ success: true, order });
//   } catch (err) {
//     console.error("Order Fetch Error:", err);
//     res.status(500).json({
//       success: false,
//       error: "Could not fetch order",
//       details: err.message,
//     });
//   }
// };

// export const getUserOrders = async (req, res) => {
//   try {
//     const userId = req.query.userId;
//     if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid or missing user ID",
//       });
//     }
//     const orders = await Payment.find({
//       userId: new mongoose.Types.ObjectId(userId),
//     })
//       .sort({ orderDate: -1 })
//       .populate("userId")
//       .populate("items.productId");
//     res.status(200).json({ success: true, orders });
//   } catch (err) {
//     console.error("User Order Fetch Error:", err);
//     res.status(500).json({
//       success: false,
//       error: "Could not fetch user orders",
//       details: err.message,
//     });
//   }
// };

// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Payment.find()
//       .sort({ orderDate: -1 })
//       .populate("userId")
//       .populate("items.productId");
//     res.status(200).json({ success: true, orders });
//   } catch (err) {
//     console.error("Admin Order Fetch Error:", err);
//     res.status(500).json({
//       success: false,
//       error: "Could not fetch all orders",
//       details: err.message,
//     });
//   }
// };

// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderStatus } = req.body;
//     const { orderId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(orderId)) {
//       return res.status(400).json({ success: false, message: "Invalid order ID" });
//     }

//     if (!orderStatus || !["pending", "processing", "shipped", "delivered", "cancelled"].includes(orderStatus)) {
//       return res.status(400).json({ success: false, message: "Invalid order status" });
//     }

//     const updatedOrder = await Payment.findByIdAndUpdate(
//       orderId,
//       { orderStatus },
//       { new: true, runValidators: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order not found", success: false });
//     }

//     res.status(200).json({
//       message: "Order status updated",
//       order: updatedOrder,
//       success: true,
//     });
//   } catch (err) {
//     console.error("Order Update Error:", err.message);
//     res.status(500).json({
//       error: "Could not update order",
//       details: err.message,
//       success: false,
//     });
//   }
// };



import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Payment } from "../models/Payment.js";
import { Customer } from "../models/Customer.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Customer Registration
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ( !email || !password) {
      return res.status(400).json({
        success: false,
        message: "email, and password are required",
      });
    }

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const customer = await Customer.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Customer registered successfully",
      customer: { id: customer._id, email: customer.email },
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: err.message,
    });
  }
};

// Customer Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      customer: { id: customer._id, email: customer.email },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message,
    });
  }
};

// Checkout
export const checkout = async (req, res) => {
  try {
    const { totalAmount } = req.body;
    if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
      return res.status(400).json({ error: "Invalid or missing totalAmount" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(Number(totalAmount) * 100), // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json(order);
  } catch (err) {
    console.error("Checkout Error:", err);
    res.status(500).json({ error: "Checkout failed", details: err.message });
  }
};

// Verify Payment
export const verify = async (req, res) => {
  try {
    console.log("Verify Request Body:", JSON.stringify(req.body, null, 2));

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      totalAmount,
      items,
      customerId,
      shippingAddress,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing Razorpay payment details",
      });
    }

    if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing totalAmount",
      });
    }

    const requiredFields = [
      "fullName",
      "address",
      "city",
      "state",
      "country",
      "pincode",
      "phoneNumber",
    ];
    const missingFields = requiredFields.filter(
      (field) => !shippingAddress?.[field]
    );
    if (missingFields.length) {
      return res.status(400).json({
        success: false,
        message: `Missing shipping fields: ${missingFields.join(", ")}`,
      });
    }

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      items.some(
        (item) =>
          !item.title ||
          typeof item.title !== "string" ||
          typeof item.quantity !== "number" ||
          typeof item.price !== "number" ||
          !item.productId ||
          !mongoose.Types.ObjectId.isValid(item.productId) ||
          (item.images && typeof item.images !== "string")
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing items",
      });
    }

    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing customerId",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    const paymentData = {
      orderId: `order_${Date.now()}`,
      paymentId: razorpay_payment_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      signature: razorpay_signature,
      totalAmount: Number(totalAmount),
      customerId: new mongoose.Types.ObjectId(customerId),
      shippingAddress,
      items: items.map((item) => ({
        productId: new mongoose.Types.ObjectId(item.productId),
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        images: item.images || undefined,
      })),
      paymentStatus: "completed",
      orderStatus: "pending",
      orderDate: new Date(),
    };

    console.log("Payment Data to Save:", JSON.stringify(paymentData, null, 2));
    const newPayment = await Payment.create(paymentData);
    console.log("New Payment Created:", JSON.stringify(newPayment, null, 2));

    res.status(200).json({
      success: true,
      message: "Payment verified and recorded successfully",
      payment: newPayment,
      customerId,
    });
  } catch (err) {
    console.error("Payment Verification Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error during verification",
      error: err.message,
    });
  }
};

// Create COD Order
export const createCODOrder = async (req, res) => {
  try {
    const { totalAmount, items, customerId, shippingAddress } = req.body;

    if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing totalAmount",
      });
    }

    const requiredFields = [
      "fullName",
      "address",
      "city",
      "state",
      "country",
      "pincode",
      "phoneNumber",
    ];
    const missingFields = requiredFields.filter(
      (field) => !shippingAddress?.[field]
    );
    if (missingFields.length) {
      return res.status(400).json({
        success: false,
        message: `Missing shipping fields: ${missingFields.join(", ")}`,
      });
    }

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      items.some(
        (item) =>
          !item.title ||
          typeof item.title !== "string" ||
          typeof item.quantity !== "number" ||
          typeof item.price !== "number" ||
          !item.productId ||
          !mongoose.Types.ObjectId.isValid(item.productId) ||
          (item.images && typeof item.images !== "string")
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing items",
      });
    }

    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing customerId",
      });
    }

    const paymentData = {
      orderId: `cod_${Date.now()}`,
      paymentId: null,
      razorpayPaymentId: null,
      razorpayOrderId: null,
      signature: null,
      totalAmount: Number(totalAmount),
      customerId: new mongoose.Types.ObjectId(customerId),
      shippingAddress,
      items: items.map((item) => ({
        productId: new mongoose.Types.ObjectId(item.productId),
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        images: item.images || undefined,
      })),
      paymentStatus: "pending",
      orderStatus: "pending",
      orderDate: new Date(),
    };

    console.log("COD Payment Data to Save:", JSON.stringify(paymentData, null, 2));
    const newPayment = await Payment.create(paymentData);
    console.log("New COD Payment Created:", JSON.stringify(newPayment, null, 2));

    res.status(201).json({
      success: true,
      message: "COD order created successfully",
      payment: newPayment,
      customerId,
    });
  } catch (err) {
    console.error("COD Order Creation Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error during COD order creation",
      error: err.message,
    });
  }
};

export const getOrderByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ success: false, error: "Invalid customer ID" });
    }

    const orders = await Payment.find({ customerId }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ success: false, error: "No orders found" });
    }

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get Customer Orders
export const getCustomerOrders = async (req, res) => {
  try {
    const customerId = req.query.customerId;
    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing customer ID",
      });
    }
    const orders = await Payment.find({
      customerId: new mongoose.Types.ObjectId(customerId),
    })
      .sort({ orderDate: -1 })
      .populate("customerId")
      .populate("items.productId");
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Customer Order Fetch Error:", err);
    res.status(500).json({
      success: false,
      error: "Could not fetch customer orders",
      details: err.message,
    });
  }
};

// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Payment.find()
//       .sort({ orderDate: -1 })
//       .populate("customerId") // Populate customerId
//       .populate("items.productId"); // Populate productId in items

//     // Log the orders to debug
//     console.log("Fetched orders:", orders);

//     // Check if customerId is populated
//     const ordersWithCustomer = orders.map((order) => ({
//       ...order._doc,
//       customerId: order.customerId ? order.customerId : "N/A",
//     }));

//     res.status(200).json({ success: true, orders: ordersWithCustomer });
//   } catch (err) {
//     console.error("Admin Order Fetch Error:", err);
//     res.status(500).json({
//       success: false,
//       error: "Could not fetch all orders",
//       details: err.message,
//     });
//   }
// };

// Update Order Status

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Payment.find()
      .sort({ orderDate: -1 })
      .populate({
        path: "customerId",
        select: "email", // Populate email from Customer model
      })
      .populate({
        path: "items.productId",
        select: "title price", // Populate product title and price
      });

    // Ensure customerId is included in the response even if not populated
    const ordersWithCustomerId = orders.map(order => ({
      ...order.toObject(),
      customerId: order.customerId?._id || order.customerId || "N/A",
    }));

    res.status(200).json({ success: true, orders: ordersWithCustomerId });
  } catch (err) {
    console.error("Admin Order Fetch Error:", err);
    res.status(500).json({
      success: false,
      error: "Could not fetch all orders",
      details: err.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ success: false, message: "Invalid order ID" });
    }

    if (
      !orderStatus ||
      !["pending", "processing", "shipped", "delivered", "cancelled"].includes(
        orderStatus
      )
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order status" });
    }

    const updatedOrder = await Payment.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }

    res.status(200).json({
      message: "Order status updated",
      order: updatedOrder,
      success: true,
    });
  } catch (err) {
    console.error("Order Update Error:", err.message);
    res.status(500).json({
      error: "Could not update order",
      details: err.message,
      success: false,
    });
  }
};