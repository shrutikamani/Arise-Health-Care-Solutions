  import express from "express";
  import {
    createOrder,
    getOrderById,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
  } from "../controllers/order.js";

  const router = express.Router();

  router.post("/", createOrder);
  router.get("/orders/:orderId", getOrderById);
  router.get("/user/:userId", getUserOrders);
  router.get("/admin/all-orders", getAllOrders); // 💡 Use this in AdminOrders
  router.put("/:orderId/status", updateOrderStatus);

  export default router;
