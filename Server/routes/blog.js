import express from "express";
import multer from "multer";
import path from "path";
import { createBlog, getBlogs, updateBlog, deleteBlog, uploadImage } from "../controllers/blog.js";

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// Blog Routes
router.post("/create", createBlog);
router.get("/all", getBlogs);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);
router.post("/upload-image", upload.single("image"), uploadImage);

export default router;