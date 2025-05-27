import jwt from "jsonwebtoken";
import User from '../models/User.js';
import { Admin } from "../models/Admin.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; 
    console.log("token", token);
    
    if (!token) {
      return res.status(401).json({ message: "Token format incorrect" });
    }

    const decoded = jwt.verify(token, "54321");
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return res.status(403).json({ message: "Access Denied: Admin not found" });
    }
    req.admin = admin;
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "54321");
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  res.status(403).json({ message: "Admin access only" });
};
