  import mongoose from "mongoose";

  const productSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: [5, "Title must be at least 5 characters long"],
      },
      images: {
        type: [String], // URL or path to image
        required: [true, "Image is required"],
      },
      description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minlength: [10, "Description must be at least 10 characters long"],
      },
      price: {
        type: Number,
        required: [true, "Price is required"],
        min: [1, "Price must be at least 1"],
      },
      feature: {
        type: [String],  // Array of features
        required: [true, "Feature is required"],
        minlength: [10, "Feature must be at least 10 characters long"],
      },
      category: {
        type: String,
        required: [true, "Category is required"],
        enum: {
          values: ["Electronics", "Fashion", "Home", "Books", "Toys"], // List of categories
          message: "{VALUE} is not a valid category", // Custom error message for invalid category
        },
      },
    },
    { timestamps: true }
  );

  const Product = mongoose.model("Product", productSchema);
  export default Product;