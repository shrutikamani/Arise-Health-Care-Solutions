// import mongoose from "mongoose";
// import { Address } from "../models/Address.js";

// // Add new address
// export const addAddress = async (req, res) => {
//   try {
//     console.log("Request body:", req.body);

//     const {
//       fullName,
//       address,
//       city,
//       state,
//       country,
//       pincode,
//       phoneNumber,
//     } = req.body;

//     // Validate required fields
//     if (!fullName || !address || !city || !state || !country || pincode == null || phoneNumber == null) {
//       console.log("Missing fields:", { fullName, address, city, state, country, pincode, phoneNumber });
//       return res.status(400).json({
//         message: "All fields are required",
//         missing: { fullName, address, city, state, country, pincode, phoneNumber },
//         success: false,
//       });
//     }

//     // Validate and cast pincode
//     const pincodeStr = pincode.toString();
//     if (!/^[1-9][0-9]{5}$/.test(pincodeStr)) {
//       console.log("Invalid pincode:", pincode);
//       return res.status(400).json({
//         message: "Pincode must be a valid 6-digit number starting with 1-9",
//         success: false,
//       });
//     }
//     const pincodeNum = Number(pincodeStr);

//     // Validate and cast phoneNumber
//     const phoneNumberStr = phoneNumber.toString();
//     if (!/^[6-9][0-9]{9}$/.test(phoneNumberStr)) {
//       console.log("Invalid phoneNumber:", phoneNumber);
//       return res.status(400).json({
//         message: "Phone number must be a valid 10-digit Indian number starting with 6-9",
//         success: false,
//       });
//     }
//     const phoneNumberNum = Number(phoneNumberStr);

//     // Check if an address with the same phoneNumber already exists
//     let userId;
//     const existingAddress = await Address.findOne({ phoneNumber: phoneNumberNum });

//     if (existingAddress) {
//       console.log("Found existing address with phoneNumber:", phoneNumberNum, "userId:", existingAddress.userId);
//       userId = existingAddress.userId; // Reuse existing userId
//     } else {
//       userId = new mongoose.Types.ObjectId(); // Generate new userId for new phoneNumber
//       console.log("Generated new userId for new phoneNumber:", userId.toString());
//     }

//     const userAddress = await Address.create({
//       userId,
//       fullName,
//       address,
//       city,
//       state,
//       country,
//       pincode: pincodeNum,
//       phoneNumber: phoneNumberNum,
//     });

//     console.log("Address created:", userAddress);

//     res.status(201).json({
//       message: "Address added",
//       userAddress,
//       userId: userId.toString(),
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error creating address:", error, "\nStack:", error.stack);
//     if (error.name === "ValidationError") {
//       const errors = {};
//       for (let field in error.errors) {
//         errors[field] = error.errors[field].message;
//       }
//       return res.status(400).json({
//         message: "Validation failed",
//         errors,
//         success: false,
//       });
//     }
//     if (error.code === 11000) {
//       console.log("Duplicate key error:", error.keyValue);
//       return res.status(400).json({
//         message: "Duplicate entry detected",
//         error: error.keyValue,
//         success: false,
//       });
//     }
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//       stack: error.stack,
//       success: false,
//     });
//   }
// };

// // Get all addresses for a user
// export const getAddresses = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       console.log("Invalid userId:", userId);
//       return res.status(400).json({
//         message: "Invalid userId",
//         success: false,
//       });
//     }

//     const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

//     if (!addresses.length) {
//       console.log("No addresses found for userId:", userId);
//       return res.status(404).json({
//         message: "No addresses found for this user",
//         success: false,
//       });
//     }

//     res.json({
//       message: "Addresses retrieved",
//       addresses,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error retrieving addresses:", error, "\nStack:", error.stack);
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//       success: false,
//     });
//   }
// };

import mongoose from "mongoose";
import { Address } from "../models/Address.js";

// Add new address
export const addAddress = async (req, res) => {
  try {
    const { fullName, address, city, state, country, pincode, phoneNumber } = req.body;

    // Validate required fields
    const missingFields = [];
    if (!fullName) missingFields.push("fullName");
    if (!address) missingFields.push("address");
    if (!city) missingFields.push("city");
    if (!state) missingFields.push("state");
    if (!country) missingFields.push("country");
    if (pincode == null) missingFields.push("pincode");
    if (phoneNumber == null) missingFields.push("phoneNumber");

    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields);
      return res.status(400).json({
        message: "All fields are required",
        missing: missingFields,
        success: false,
      });
    }

    // Validate and cast pincode
    const pincodeStr = pincode.toString();
    if (!/^[1-9][0-9]{5}$/.test(pincodeStr)) {
      console.log("Invalid pincode:", pincode);
      return res.status(400).json({
        message: "Pincode must be a valid 6-digit number starting with 1-9",
        success: false,
      });
    }
    const pincodeNum = Number(pincodeStr);

    // Validate and cast phoneNumber
    const phoneNumberStr = phoneNumber.toString();
    if (!/^[6-9][0-9]{9}$/.test(phoneNumberStr)) {
      console.log("Invalid phoneNumber:", phoneNumber);
      return res.status(400).json({
        message: "Phone number must be a valid 10-digit Indian number starting with 6-9",
        success: false,
      });
    }
    const phoneNumberNum = Number(phoneNumberStr);

    // Check if an address with the same phoneNumber already exists
    let userId;
    const existingAddress = await Address.findOne({ phoneNumber: phoneNumberNum });

    if (existingAddress) {
      console.log("Found existing address with phoneNumber:", phoneNumberNum, "userId:", existingAddress.userId);
      userId = existingAddress.userId; // Reuse existing userId
    } else {
      userId = new mongoose.Types.ObjectId(); // Generate new userId for new phoneNumber
      console.log("Generated new userId for new phoneNumber:", userId.toString());
    }

    const userAddress = await Address.create({
      userId,
      fullName,
      address,
      city,
      state,
      country,
      pincode: pincodeNum,
      phoneNumber: phoneNumberNum,
    });

    console.log("Address created:", userAddress);

    res.status(201).json({
      message: "Address added",
      userAddress,
      userId: userId.toString(),
      success: true,
    });
  } catch (error) {
    console.error("Error creating address:", error.message, "\nStack:", error.stack);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        message: "Validation failed",
        errors,
        success: false,
      });
    }
    if (error.code === 11000) {
      console.log("Duplicate key error:", error.keyValue);
      return res.status(400).json({
        message: "Duplicate entry detected",
        error: error.keyValue,
        success: false,
      });
    }
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

// Get all addresses for a user
export const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid userId:", userId);
      return res.status(400).json({
        message: "Invalid userId",
        success: false,
      });
    }

    const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

    if (!addresses.length) {
      console.log("No addresses found for userId:", userId);
      return res.status(404).json({
        message: "No addresses found for this user",
        success: false,
      });
    }

    res.json({
      message: "Addresses retrieved",
      addresses,
      success: true,
    });
  } catch (error) {
    console.error("Error retrieving addresses:", error.message, "\nStack:", error.stack);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

// Update and delete functions remain unchanged

// Update an address by its _id
export const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const updateData = req.body;

    console.log("Update addressId:", addressId, "Update data:", updateData);

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      console.log("Invalid addressId:", addressId);
      return res.status(400).json({
        message: "Invalid addressId",
        success: false,
      });
    }

    // Prevent updating userId
    if (updateData.userId) {
      console.log("Attempted to update userId:", updateData.userId);
      delete updateData.userId;
    }

    // Validate and cast phoneNumber if provided
    if (updateData.phoneNumber != null) {
      const phoneNumberStr = updateData.phoneNumber.toString();
      if (!/^[6-9][0-9]{9}$/.test(phoneNumberStr)) {
        console.log("Invalid phoneNumber in update:", updateData.phoneNumber);
        return res.status(400).json({
          message: "Phone number must be a valid 10-digit Indian number starting with 6-9",
          success: false,
        });
      }
      updateData.phoneNumber = Number(phoneNumberStr);
    }

    // Validate and cast pincode if provided
    if (updateData.pincode != null) {
      const pincodeStr = updateData.pincode.toString();
      if (!/^[1-9][0-9]{5}$/.test(pincodeStr)) {
        console.log("Invalid pincode in update:", updateData.pincode);
        return res.status(400).json({
          message: "Pincode must be a valid 6-digit number starting with 1-9",
          success: false,
        });
      }
      updateData.pincode = Number(pincodeStr);
    }

    const updated = await Address.findByIdAndUpdate(addressId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      console.log("Address not found for addressId:", addressId);
      return res.status(404).json({
        message: "Address not found",
        success: false,
      });
    }

    console.log("Address updated:", updated);

    res.json({
      message: "Address updated",
      address: updated,
      success: true,
    });
  } catch (error) {
    console.error("Error updating address:", error, "\nStack:", error.stack);
    if (error.name === "ValidationError") {
      const errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({
        message: "Validation failed",
        errors,
        success: false,
      });
    }
    if (error.code === 11000) {
      console.log("Duplicate key error:", error.keyValue);
      return res.status(400).json({
        message: "Duplicate entry detected",
        error: error.keyValue,
        success: false,
      });
    }
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

// Delete an address by its _id
export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    console.log("Delete addressId:", addressId);

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      console.log("Invalid addressId:", addressId);
      return res.status(400).json({
        message: "Invalid addressId",
        success: false,
      });
    }

    const deleted = await Address.findByIdAndDelete(addressId);

    if (!deleted) {
      console.log("Address not found for addressId:", addressId);
      return res.status(404).json({
        message: "Address not found",
        success: false,
      });
    }

    console.log("Address deleted:", deleted);

    res.json({
      message: "Address deleted",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting address:", error, "\nStack:", error.stack);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

