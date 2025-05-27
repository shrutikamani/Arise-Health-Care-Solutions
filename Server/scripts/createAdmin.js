import bcrypt from "bcryptjs";
import { Admin } from "../models/Admin.js";  

export const createAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@example.com" });

    if (existingAdmin) {
      console.log("Admin already exists...!");
    } else {
      const hashPass = await bcrypt.hash("admin123", 10);
      await Admin.create({
        name: "SuperAdmin",
        email: "admin@example.com",
        password: hashPass,
      });
      console.log("Admin Created...!");
    }
  } catch (error) {
    console.error("Error creating admin...!", error);
  }
};
