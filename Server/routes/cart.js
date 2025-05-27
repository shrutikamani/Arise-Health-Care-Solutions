import express from "express";
import { addToCart, getCart, removeFromCart, clearCart, decreaseQuantity } from "../controllers/cart.js";

const router = express.Router();

router.post("/add", addToCart);
router.post("/decrease-qty", decreaseQuantity);
router.get("/:userId", getCart);
router.post("/remove", removeFromCart);
router.delete("/:userId", clearCart);

export default router;
