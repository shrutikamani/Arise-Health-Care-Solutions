// routes/megaMenu.js
import express from "express";
import { getMegaMenu, updateMegaMenu,addMegaMenu } from "../controllers/megaMenu.js";

const router = express.Router();

// Get mega menu
router.get("/all", getMegaMenu);

// Update mega menu
router.post("/update", updateMegaMenu);

// Add mega menu category
router.post("/add", addMegaMenu);

export default router;