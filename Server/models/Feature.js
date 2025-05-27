import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true, minlength: 10 },
  images: { type: [String], required: true } // Array of image URLs or local paths
}, { timestamps: true });

const Feature = mongoose.model("Feature", featureSchema);
export default Feature;
