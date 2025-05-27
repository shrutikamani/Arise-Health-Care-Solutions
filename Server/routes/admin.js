import express from "express";
import { adminLogin, adminLogout } from "../controllers/admin.js";

const router = express.Router();

// Remove verifyAdmin middleware from login route
router.post("/login", adminLogin);
router.post('/logout', adminLogout);

export default router;