import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: "Admin not found...!" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials...!" });

    const token = jwt.sign({ id: admin._id }, "54321", { expiresIn: "1d" });

    res.cookie("admin_token", token, {
      httpOnly: true, 
      secure: false,  
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, message: "Login successfully...!", token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("admin_token", { httpOnly: true, secure: false, sameSite: "Lax" });

    res.json({ success: true, message: "Logout successfully...!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error while logging out...!", error });
  }
};