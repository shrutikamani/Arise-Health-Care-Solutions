import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      index: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      minLength: [2, "Full name must be at least 2 characters long"],
      maxLength: [100, "Full name cannot exceed 100 characters"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      minLength: [5, "Address must be at least 5 characters long"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    pincode: {
      type: Number,
      required: [true, "Pincode is required"],
      validate: {
        validator: function (value) {
          return /^[1-9][0-9]{5}$/.test(value.toString());
        },
        message: "Please enter a valid 6-digit pincode starting with 1-9",
      },
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required"],
      validate: {
        validator: function (value) {
          return /^[6-9][0-9]{9}$/.test(value.toString());
        },
        message: "Please enter a valid 10-digit Indian phone number starting with 6-9",
      },
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Address = mongoose.model("Address", addressSchema);