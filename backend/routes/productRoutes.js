import express from "express";
import {
  createProduct,
  getProducts,
  getLowStockProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Note: /low-stock must be declared before /:id so it isn't treated as an ID
router.get("/low-stock", getLowStockProducts);

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
