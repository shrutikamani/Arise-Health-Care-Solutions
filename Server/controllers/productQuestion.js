import ProductQuestion from "../models/productQuestion.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

export const createProductQuestion = async (req, res) => {
  try {
    const { productId, name, phoneNumber, question } = req.body;
    const errors = [];

    // Validate productId
    if (!productId) errors.push("Product ID is required.");
    if (!mongoose.Types.ObjectId.isValid(productId)) errors.push("Invalid Product ID.");

    // Validate other fields
    if (!name || name.trim().length < 2) errors.push("Name must be at least 2 characters.");
    if (!phoneNumber || !/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) errors.push("Invalid Phone Number.");
    if (!question || question.trim().length < 5) errors.push("Question must be at least 5 characters.");

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) errors.push("Product not found.");

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const newQuestion = new ProductQuestion({
      productId: new mongoose.Types.ObjectId(productId),
      name: name.trim(),
      phoneNumber: phoneNumber.trim(),
      question: question.trim(),
    });

    await newQuestion.save();
    res.status(201).json({ success: true, message: "Question submitted successfully", data: newQuestion });
  } catch (error) {
    console.error("Create Product Question Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getProductQuestions = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid Product ID" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const questions = await ProductQuestion.find({ productId: new mongoose.Types.ObjectId(productId) })
      .populate("productId") // Populate the product details in the response
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    console.error("Get Product Questions Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getValidProductId = async (req, res) => {
  try {
    const product = await Product.findOne().select('_id');
    
    if (!product) {
      return res.status(404).json({ success: false, error: "No products found in the database" });
    }

    res.status(200).json({ success: true, productId: product._id });
  } catch (error) {
    console.error("Get Valid Product ID Error:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getAllProductQuestions = async (req, res) => {
  try {
    const questions = await ProductQuestion.find().populate("productId").sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};