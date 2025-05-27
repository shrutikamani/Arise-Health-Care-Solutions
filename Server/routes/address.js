  import express from "express";
  import {
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
  } from "../controllers/address.js";

  const router = express.Router();


  router.post("/add", addAddress);
  router.get("/:userId", getAddresses);
  router.put("/:addressId", updateAddress);
  router.delete("/:addressId", deleteAddress);

  export default router;