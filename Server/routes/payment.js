  import express from "express";
  import {
    checkout,
    verify,
    createCODOrder,
    getOrderByCustomerId,
    getCustomerOrders,
    getAllOrders,
    updateOrderStatus,
    register,
    login,
  } from "../controllers/payment.js";

  const router = express.Router();

  // Public Routes
  router.post("/register", register);
  router.post("/login", login);
  router.post("/checkout", checkout);
  router.post("/verify", verify);
  router.post("/cod", createCODOrder);
  router.get("/order/:customerId", getOrderByCustomerId);
  router.get("/orders", getCustomerOrders);
  router.get("/all-orders", getAllOrders);
  router.put("/order/:orderId/status", updateOrderStatus);

  export default router;