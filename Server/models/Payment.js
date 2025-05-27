  // import mongoose from "mongoose";

  // const paymentSchema = new mongoose.Schema(
  //   {
  //     orderId: { type: String, required: true },
  //     paymentId: { type: String },
  //     signature: { type: String },
  //     amount: { type: Number, required: true },
  //     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //     userShipping: {
  //       fullName: String,
  //       phoneNumber: String,
  //       pincode: String,
  //       address: String,
  //       city: String,
  //       state: String,
  //     },
  //     orderItems: [
  //       {
  //         name: String,
  //         qty: Number,
  //         price: Number,
  //         image: String,
  //         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  //       },
  //     ],
  //     payStatus: { type: String, enum: ["pending", "paid"], required: true },
  //     orderDate: { type: Date, default: Date.now },
  //   },
  //   { collection: "payments" } // Explicitly set collection name
  // );

  // export const Payment = mongoose.model("Payment", paymentSchema);


  // import mongoose from "mongoose";

  // const paymentSchema = new mongoose.Schema(
  //   {
  //     orderId: { type: String, required: true }, // General order identifier
  //     paymentId: { type: String }, // Razorpay payment ID (optional)
  //     razorpayPaymentId: { type: String }, // Explicit Razorpay payment ID
  //     razorpayOrderId: { type: String }, // Razorpay order ID
  //     signature: { type: String }, // Razorpay signature (optional)
  //     totalAmount: { type: Number, required: true }, // Changed from amount
  //     userId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       required: true,
  //       ref: "User",
  //     },
  //     shippingAddress: {
  //       fullName: { type: String, required: true },
  //       address: { type: String, required: true },
  //       city: { type: String, required: true },
  //       state: { type: String, required: true },
  //       country: { type: String, required: true },
  //       pincode: { type: String, required: true },
  //       phoneNumber: { type: String, required: true },
  //     },
  //     items: [
  //       {
  //         productId: {
  //           type: mongoose.Schema.Types.ObjectId,
  //           required: true,
  //           ref: "Product",
  //         },
  //         title: { type: String, required: true },
  //         price: { type: Number, required: true },
  //         quantity: { type: Number, required: true },
  //         images: { type: String },
  //       },
  //     ],
  //     paymentStatus: {
  //       type: String,
  //       enum: ["pending", "completed", "failed"],
  //       default: "pending",
  //     },
  //     orderStatus: {
  //       type: String,
  //       enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
  //       default: "pending",
  //     },
  //     orderDate: { type: Date, default: Date.now },
  //   },
  //   {
  //     collection: "payments",
  //     timestamps: true,
  //   }
  // );

  // export const Payment = mongoose.model("Payment", paymentSchema);

  import mongoose from "mongoose";

  const paymentSchema = new mongoose.Schema({
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentId: {
      type: String,
      default: null,
    },
    razorpayPaymentId: {
      type: String,
      default: null,
    },
    razorpayOrderId: {
      type: String,
      default: null,
    },
    signature: {
      type: String,
      default: null,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pincode: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        images: { type: [String] }, // Changed to array of strings
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  });

  export const Payment = mongoose.model("Payment", paymentSchema);