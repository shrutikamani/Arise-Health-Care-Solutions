// import mongoose from "mongoose";
// import { Order } from "../models/Order.js";
// import { Address } from "../models/Address.js";
// import { v4 as uuidv4 } from "uuid";

// export const createOrder = async (req, res) => {
//   try {
//     console.log("Order payload:", req.body);

//     const {
//       items,
//       shippingAddress,
//       totalAmount,
//       phoneNumber,
//       paymentMethod,
//       razorpayPaymentId,
//       razorpayOrderId,
//     } = req.body;

//     // Check for missing required fields
//     const missingFields = [];
//     if (!items?.length) missingFields.push("items");
//     if (!shippingAddress) missingFields.push("shippingAddress");
//     if (!totalAmount) missingFields.push("totalAmount");

//     // Extract phoneNumber from shippingAddress if not at top level
//     const effectivePhoneNumber = phoneNumber || shippingAddress?.phoneNumber;
//     if (!effectivePhoneNumber) missingFields.push("phoneNumber");

//     if (missingFields.length > 0) {
//       console.log("Missing fields:", missingFields);
//       return res.status(400).json({
//         error: "Missing required fields",
//         missing: missingFields,
//         success: false,
//       });
//     }

//     // Validate shippingAddress fields
//     const {
//       fullName,
//       address,
//       city,
//       state,
//       country,
//       pincode,
//     } = shippingAddress;
//     const addressErrors = [];
//     if (!fullName?.trim()) addressErrors.push("fullName is required");
//     if (fullName?.length < 2) addressErrors.push("fullName must be at least 2 characters");
//     if (!address?.trim()) addressErrors.push("address is required");
//     if (address?.length < 5) addressErrors.push("address must be at least 5 characters");
//     if (!city?.trim()) addressErrors.push("city is required");
//     if (!state?.trim()) addressErrors.push("state is required");
//     if (!country?.trim()) addressErrors.push("country is required");
//     if (!pincode) addressErrors.push("pincode is required");
//     if (!/^[1-9][0-9]{5}$/.test(pincode?.toString())) {
//       addressErrors.push("pincode must be a valid 6-digit number starting with 1-9");
//     }

//     if (addressErrors.length > 0) {
//       console.log("Shipping address validation errors:", addressErrors);
//       return res.status(400).json({
//         error: "Invalid shipping address",
//         details: addressErrors,
//         success: false,
//       });
//     }

//     // Validate and cast phoneNumber
//     const phoneNumberStr = effectivePhoneNumber.toString();
//     if (!/^[6-9][0-9]{9}$/.test(phoneNumberStr)) {
//       console.log("Invalid phoneNumber:", phoneNumberStr);
//       return res.status(400).json({
//         message: "Phone number must be a valid 10-digit Indian number starting with 6-9",
//         success: false,
//       });
//     }
//     const phoneNumberNum = Number(phoneNumberStr);

//     // Find or create address to get userId
//     let userId;
//     let existingAddress = await Address.findOne({ phoneNumber: phoneNumberNum });
//     if (existingAddress) {
//       userId = existingAddress.userId;
//       console.log("Reusing userId from existing address:", userId);
//     } else {
//       // Generate new userId and save address
//       userId = new mongoose.Types.ObjectId();
//       console.log("Generated new userId:", userId);
//       existingAddress = await Address.create({
//         userId,
//         fullName,
//         address,
//         city,
//         state,
//         country,
//         pincode: Number(pincode),
//         phoneNumber: phoneNumberNum,
//       });
//       console.log("Created new address:", existingAddress);
//     }

//     // Create new order
//     const newOrder = new Order({
//       userId,
//       orderId: uuidv4(),
//       items,
//       shippingAddress, // Store as object, not Address reference
//       totalAmount,
//       razorpayPaymentId: paymentMethod === "UPI" ? razorpayPaymentId : undefined,
//       razorpayOrderId: paymentMethod === "UPI" ? razorpayOrderId : undefined,
//       paymentStatus: paymentMethod === "COD" ? "pending" : "completed",
//     });

//     const savedOrder = await newOrder.save();
//     console.log("Order created:", savedOrder);

//     res.status(201).json({
//       message: "Order created successfully",
//       order: savedOrder,
//       userId: userId.toString(),
//       success: true,
//     });
//   } catch (err) {
//     console.error("Order Creation Error:", err, "\nStack:", err.stack);
//     if (err.name === "ValidationError") {
//       const errors = Object.values(err.errors).map(e => e.message);
//       return res.status(400).json({
//         error: "Validation failed",
//         details: errors,
//         success: false,
//       });
//     }
//     res.status(500).json({
//       error: "Could not create order",
//       details: err.message,
//       success: false,
//     });
//   }
// };
import mongoose from "mongoose";
import { Order } from "../models/Order.js";
import { Address } from "../models/Address.js";
import { v4 as uuidv4 } from "uuid";

export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      totalAmount,
      phoneNumber,
      paymentMethod,
      razorpayPaymentId,
      razorpayOrderId,
    } = req.body;

    // Check for missing required fields
    const missingFields = [];
    if (!items?.length) missingFields.push("items");
    if (!shippingAddress) missingFields.push("shippingAddress");
    if (!totalAmount) missingFields.push("totalAmount");

    const effectivePhoneNumber = phoneNumber || shippingAddress?.phoneNumber;
    if (!effectivePhoneNumber) missingFields.push("phoneNumber");

    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields);
      return res.status(400).json({
        error: "Missing required fields",
        missing: missingFields,
        success: false,
      });
    }

    // Validate shippingAddress fields
    const { fullName, address, city, state, country, pincode } = shippingAddress;
    const addressErrors = [];
    if (!fullName?.trim()) addressErrors.push("fullName is required");
    if (!address?.trim()) addressErrors.push("address is required");
    if (!city?.trim()) addressErrors.push("city is required");
    if (!state?.trim()) addressErrors.push("state is required");
    if (!country?.trim()) addressErrors.push("country is required");
    if (!pincode) addressErrors.push("pincode is required");
    if (!/^[1-9][0-9]{5}$/.test(pincode?.toString())) {
      addressErrors.push("pincode must be a valid 6-digit number starting with 1-9");
    }

    if (addressErrors.length > 0) {
      console.log("Shipping address validation errors:", addressErrors);
      return res.status(400).json({
        error: "Invalid shipping address",
        details: addressErrors,
        success: false,
      });
    }

    // Validate and cast phoneNumber
    const phoneNumberStr = effectivePhoneNumber.toString();
    if (!/^[6-9][0-9]{9}$/.test(phoneNumberStr)) {
      console.log("Invalid phoneNumber:", phoneNumberStr);
      return res.status(400).json({
        message: "Phone number must be a valid 10-digit Indian number starting with 6-9",
        success: false,
      });
    }
    const phoneNumberNum = Number(phoneNumberStr);

    // Find or create address to get userId
    let userId;
    let existingAddress = await Address.findOne({ phoneNumber: phoneNumberNum });
    if (existingAddress) {
      userId = existingAddress.userId;
      console.log("Reusing userId from existing address:", userId);
    } else {
      userId = new mongoose.Types.ObjectId();
      console.log("Generated new userId:", userId);
      existingAddress = await Address.create({
        userId,
        fullName,
        address,
        city,
        state,
        country,
        pincode: Number(pincode),
        phoneNumber: phoneNumberNum,
      });
      console.log("Created new address:", existingAddress);
    }

    // Create new order
    const newOrder = new Order({
      userId,
      orderId: uuidv4(),
      items,
      shippingAddress,
      totalAmount,
      razorpayPaymentId: paymentMethod === "UPI" ? razorpayPaymentId : undefined,
      razorpayOrderId: paymentMethod === "UPI" ? razorpayOrderId : undefined,
      paymentStatus: paymentMethod === "COD" ? "pending" : "completed",
    });

    const savedOrder = await newOrder.save();
    console.log("Order created:", savedOrder);

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
      userId: userId.toString(),
      success: true,
    });
  } catch (err) {
    console.error("Order Creation Error:", err.message, "\nStack:", err.stack);
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        error: "Validation failed",
        details: errors,
        success: false,
      });
    }
    res.status(500).json({
      error: "Could not create order",
      details: err.message,
      success: false,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid userId:", userId);
      return res.status(400).json({
        message: "Invalid userId",
        success: false,
      });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders.length) {
      console.log("No orders found for userId:", userId);
      return res.status(404).json({
        message: "No orders found for this user",
        success: false,
      });
    }

    res.status(200).json({
      message: "User orders retrieved",
      orders,
      success: true,
    });
  } catch (err) {
    console.error("User Order Fetch Error:", err.message);
    res.status(500).json({
      error: "Could not fetch user orders",
      details: err.message,
      success: false,
    });
  }
};
// export const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.orderId);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found", success: false });
//     }

//     res.status(200).json({
//       message: "Order retrieved",
//       order,
//       success: true,
//     });
//   } catch (err) {
//     console.error("Order Fetch Error:", err.message);
//     res.status(500).json({
//       error: "Could not fetch order",
//       details: err.message,
//       success: false,
//     });
//   }
// };

// export const getUserOrders = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const orders = await Order.find({ userId }).sort({ createdAt: -1 });
//     res.status(200).json({
//       message: "User orders retrieved",
//       orders,
//       success: true,
//     });
//   } catch (err) {
//     console.error("User Order Fetch Error:", err.message);
//     res.status(500).json({
//       error: "Could not fetch user orders",
//       details: err.message,
//       success: false,
//     });
//   }
// };

export const getOrderById = async (req, res) => {
  try {
      const { orderId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(orderId)) {
          return res.status(400).json({ message: "Invalid orderId format", success: false });
      }

      const order = await Order.findById(orderId);

      if (!order) {
          return res.status(404).json({ message: "Order not found", success: false });
      }

      res.status(200).json({
          message: "Order retrieved",
          order,
          success: true,
      });
  } catch (err) {
      console.error("Order Fetch Error:", err);
      res.status(500).json({
          error: "Could not fetch order",
          details: err.message,
          success: false,
      });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "All orders retrieved",
      orders,
      success: true,
    });
  } catch (err) {
    console.error("Admin Order Fetch Error:", err.message);
    res.status(500).json({
      error: "Could not fetch all orders",
      details: err.message,
      success: false,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { orderStatus },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found", success: false });
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