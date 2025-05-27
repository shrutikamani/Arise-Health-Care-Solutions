import mongoose from "mongoose";

const productQuestionSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
    },
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minlength: [2, "User name must be at least 2 characters long"],
      maxlength: [50, "User name cannot exceed 50 characters"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid mobile number"],
    },
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
      minlength: [5, "Question must be at least 10 characters long"],
      maxlength: [500, "Question cannot exceed 500 characters"],
    },
  },
  { timestamps: true }
);

const ProductQuestion = mongoose.model("ProductQuestion", productQuestionSchema);
export default ProductQuestion;