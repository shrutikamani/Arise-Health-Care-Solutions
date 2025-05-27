import React, { createContext, useContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogContext = createContext();

// ✅ Custom Hook to use Blog Context
export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // ✅ Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:3030/blog/all");
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Add a new blog
  const addBlog = async (newBlog) => {
    try {
      const response = await fetch("http://localhost:3030/blog/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add blog");
  
      toast.success("Blog added successfully! ✅");
      fetchBlogs(); // Refresh blogs after adding
    } catch (error) {
      toast.error(error.message || "Error adding blog ❌");
    }
  };
  

  // ✅ Delete a blog
  const deleteBlog = async (id) => {
    try {
      const response = await fetch(`http://localhost:3030/blog/delete/${id}`, {
        method: "DELETE",
      });
  
      const data = await response.json(); // ✅ Parse JSON first
  
      if (!response.ok) throw new Error(data.message || "Failed to delete blog");
  
      toast.success(data.message || "Blog deleted successfully! 🗑️");
      fetchBlogs();
    } catch (error) {
      toast.error(error.message || "Error deleting blog ❌");
    }
  };
  
  // ✅ Update a blog
  const updateBlog = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3030/blog/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
  
      const data = await response.json();
  
      if (!response.ok) throw new Error(data.message || "Failed to update blog");
  
      toast.success(data.message || "Blog updated successfully! ✏️");
      fetchBlogs();
    } catch (error) {
      toast.error(error.message || "Error updating blog ❌");
    }
  };
  
  return (
    <BlogContext.Provider value={{ posts, addBlog, deleteBlog, updateBlog }}>
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </BlogContext.Provider>
  );
};

export default BlogProvider;
