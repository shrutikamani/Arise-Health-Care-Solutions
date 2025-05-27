import Product from "../models/Product.js";
import fs from "fs";
import path from "path";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// Ensure the /uploads folder exists
const uploadDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Helper function to download and save an image from a URL
const downloadImage = async (url) =>
{
  try {
    // Relaxed URL validation to allow any HTTPS URL
    if (!url.match(/^https?:\/\/.+/i)) {
      throw new Error(`Invalid URL format: ${url}`);
    }

    // Check Content-Type to ensure it's an image
    const headResponse = await axios({
      url,
      method: "HEAD",
      timeout: 5000, // 5-second timeout
    });

    const contentType = headResponse.headers["content-type"];
    if (!contentType?.startsWith("image/")) {
      throw new Error(`URL does not point to an image (Content-Type: ${contentType}): ${url}`);
    }

    // Download image as a stream
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      timeout: 10000, // 10-second timeout
    });

    // Determine extension from Content-Type or URL
    let extension;
    if (contentType.includes("jpeg") || contentType.includes("jpg")) {
      extension = ".jpg";
    } else if (contentType.includes("png")) {
      extension = ".png";
    } else if (contentType.includes("gif")) {
      extension = ".gif";
    } else {
      // Fallback to URL extension or default
      extension = path.extname(new URL(url).pathname).split("?")[0] || ".jpg";
    }

    // Generate unique filename
    const filename = `${uuidv4()}${extension}`;
    const filePath = path.join(uploadDir, filename);

    // Save image to /uploads
    await new Promise((resolve, reject) =>
    {
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", (err) =>
      {
        fs.unlink(filePath, () => { }); // Clean up on error
        reject(err);
      });
    });

    console.log(`Downloaded image from ${url} to ${filePath}`);
    return `/uploads/${filename}`;
  } catch (error) {
    throw new Error(`Failed to download image from ${url}: ${error.message}`);
  }
};

export const createProduct = async (req, res) =>
{
  try {
    const { title, description, price, feature, imgUrls, category } = req.body;
    const errors = [];

    // Validate input fields
    if (!title || title.trim().length < 5) errors.push("Title must be at least 5 characters.");
    if (!description || description.trim().length < 10) errors.push("Description must be at least 10 characters.");
    if (!price || isNaN(price) || price <= 0) errors.push("Price must be a positive number.");
    if (!feature || feature.length < 10) errors.push("Feature must be at least 10 characters.");
    if (!category || !["Electronics", "Fashion", "Home", "Books", "Toys"].includes(category)) {
      errors.push("Invalid category.");
    }

    let images = [];

    // Handle uploaded images
    if (req.files && req.files.images) {
      const uploaded = Array.isArray(req.files.images)
        ? req.files.images.map((file) => `/uploads/${file.filename}`)
        : [`/uploads/${req.files.images.filename}`];
      images.push(...uploaded);
    }

    // Handle image URLs
    if (imgUrls) {
      let urls = [];
      if (typeof imgUrls === "string") {
        urls = imgUrls.split(",").map((url) => url.trim()).filter((url) => url);
      } else if (Array.isArray(imgUrls)) {
        urls = imgUrls.map((url) => url.trim()).filter((url) => url);
      }

      if (urls.length > 10) {
        errors.push("Cannot process more than 10 image URLs.");
      } else {
        // Download images concurrently
        const downloadPromises = urls.map(async (url) =>
        {
          try {
            const localPath = await downloadImage(url);
            return localPath;
          } catch (error) {
            errors.push(error.message);
            return null;
          }
        });

        const downloadedImages = (await Promise.all(downloadPromises)).filter((path) => path !== null);
        images.push(...downloadedImages);
      }
    }

    if (images.length === 0) errors.push("At least one image is required.");
    if (errors.length > 0) {
      // Clean up downloaded images if validation fails
      images.forEach((img) =>
      {
        if (img.startsWith("/uploads/")) {
          const filePath = path.join(path.resolve(), img);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
      });
      return res.status(400).json({ success: false, errors });
    }

    const newProduct = new Product({
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price),
      feature,
      category,
      images,
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });
  } catch (error) {
    console.error("Create Product Error:", error);
    // Clean up downloaded images on error
    images.forEach((img) =>
    {
      if (img.startsWith("/uploads/")) {
        const filePath = path.join(path.resolve(), img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    });
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) =>
{
  try {
    const { title, description, price, feature, imgUrls, category } = req.body;
    const errors = [];

    // Validate category if provided
    if (category && !["Electronics", "Fashion", "Home", "Books", "Toys"].includes(category)) {
      errors.push("Invalid category.");
    }

    let images = [];

    // Handle uploaded images
    if (req.files && req.files.images) {
      const uploaded = Array.isArray(req.files.images)
        ? req.files.images.map((file) => `/uploads/${file.filename}`)
        : [`/uploads/${req.files.images.filename}`];
      images.push(...uploaded);
    }

    // Handle image URLs
    if (imgUrls) {
      let urls = [];
      if (typeof imgUrls === "string") {
        urls = imgUrls.split(",").map((url) => url.trim()).filter((url) => url);
      } else if (Array.isArray(imgUrls)) {
        urls = imgUrls.map((url) => url.trim()).filter((url) => url);
      }

      if (urls.length > 10) {
        errors.push("Cannot process more than 10 image URLs.");
      } else {
        // Download images concurrently
        const downloadPromises = urls.map(async (url) =>
        {
          try {
            const localPath = await downloadImage(url);
            return localPath;
          } catch (error) {
            errors.push(error.message);
            return null;
          }
        });

        const downloadedImages = (await Promise.all(downloadPromises)).filter((path) => path !== null);
        images.push(...downloadedImages);
      }
    }

    // Only enforce image requirement if no images are provided and no existing images
    if (images.length === 0 && !req.files && !imgUrls) {
      errors.push("At least one image is required.");
    }

    if (errors.length > 0) {
      // Clean up downloaded images if validation fails
      images.forEach((img) =>
      {
        if (img.startsWith("/uploads/")) {
          const filePath = path.join(path.resolve(), img);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
      });
      return res.status(400).json({ success: false, errors });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title: title.trim() }),
        ...(description && { description: description.trim() }), // Fixed typo: was title.trim()
        ...(price && { price: parseFloat(price) }),
        ...(feature && { feature }),
        ...(images.length > 0 && { images }),
        ...(category && { category }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.error("Update Product Error:", error);
    // Clean up downloaded images on error
    images.forEach((img) =>
    {
      if (img.startsWith("/uploads/")) {
        const filePath = path.join(path.resolve(), img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    });
    res.status(500).json({ error: error.message });
  }
};

export const getAllProducts = async (req, res) =>
{
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Get All Products Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) =>
{
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Get Product By ID Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) =>
{
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete uploaded images from file system
    product.images.forEach((img) =>
    {
      if (img.startsWith("/uploads/")) {
        const filePath = path.join(path.resolve(), img);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    });

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getRelatedProducts = async (req, res) =>
{
  try {
    const currentProduct = await Product.findById(req.params.id);
    if (!currentProduct) return res.status(404).json({ message: "Product not found" });

    // Find related products from same category but not the current product
    const relatedProducts = await Product.find({
      category: currentProduct.category,
      _id: { $ne: req.params.id },
    })

    res.json({ success: true, data: relatedProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
