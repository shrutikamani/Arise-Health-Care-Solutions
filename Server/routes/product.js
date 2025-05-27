import express from 'express';
import 
{
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getRelatedProducts,
  updateProduct,
} from '../controllers/product.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post("/create", upload, createProduct);
router.get("/allProducts", getAllProducts);
router.get("/:id", getProductById);
router.get("/related/:id", getRelatedProducts);
router.put("/:id", upload, updateProduct);
router.delete("/:id", deleteProduct);

export default router;