import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: [true, "Title is required"],
    },
    Content: {
      type: String,
      required: [true, "Content is required"],
    },
    images:{
      type: [String],
    } 
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;