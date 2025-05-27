import Blog from "../models/blog.js";
import path from "path";
import fs from "fs";

export const createBlog = async (req, res) => {
  try {
    const { Title, Content, images } = req.body;

    if (!Title || !Content) {
      return res.status(400).json({ error: "Title and content are required...!" });
    }

    const blog = new Blog({ Title, Content, images });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { Title, Content, images } = req.body;

    if (!Title.trim() || !Content.trim()) {
      return res.status(400).json({ message: "Title and Content are required...!" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found...!" });
    }

    blog.Title = Title;
    blog.Content = Content;
    if (images) blog.images = images;

    await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog Updated Successfully...!",
      updatedBlog: blog,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog Deleted Successfully...!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`; // Use this URL in the blog content
    res.status(201).json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
