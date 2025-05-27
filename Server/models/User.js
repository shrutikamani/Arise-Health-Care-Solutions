import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: [true, "FirstName is required"],
      trim: true,
      minlength: [2, "FirstName must be at least 2 characters"],
      validate: {
        validator: function (value) {
          return /^[A-Za-z]+$/.test(value); 
        },
        message: "FirstName must in Alphabetical Characters & Minimum 2 Characters",
      },
    },
    LastName: {
      type: String,
      required: [true, "LastName is required"],
      trim: true,
      minlength: [3, "LastName must be at least 3 characters"],
      validate: {
        validator: function (value) {
          return /^[A-Za-z]+$/.test(value);
        },
        message: "LastName must in Alphabetical Characters & Minimum 3 Characters",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    MobileNumber: {
      type: Number,
      required: [true, "MobileNumber is required"],
      validate: {
        validator: function (value) {
          return /^[0-9]{10}$/.test(value.toString());
        },
        message: "Mobile number must be exactly 10 digits",
      },
    },
    City: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    PinCode: {
      type: Number,
      required: [true, "PinCode is required"],
      validate: {
        validator: function (value) {
          return /^[0-9]{6}$/.test(value);
        },
        message: "PinCode must be exactly 6 digits",
      },
    },
    Message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"],
      message: "Message Must be Minimum 10 Characters",
    },
    Address: {
      type: String,
      required: [true, "Address is required"],
      minlength: [10, "Address Must be at least 10 Characters"],
      trim: true,
      message: "Address Must be Minimum 10 Characters",
    },
    status: {
      type: String,
      enum: ['Pending', 'Opened', 'Closed', 'Terminated'],
      default: 'Pending',
    },
    remark: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;