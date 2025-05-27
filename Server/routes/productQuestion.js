import express from "express";
import { createProductQuestion, getAllProductQuestions, getProductQuestions, getValidProductId } from "../controllers/productQuestion.js";


const router = express.Router();

router.post("/create", createProductQuestion);
router.get("/product/:productId", getProductQuestions);
router.get('/validProductId', getValidProductId)
router.get('/all', getAllProductQuestions)


export default router;