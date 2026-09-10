import mongoose from "mongoose";
import Product from "../models/Product.js";

const validateProductFields = ({ name, category, price, quantity, minStock }) => {
  if (!name || !category) {
    return "Name and category are required";
  }
  if (price === undefined || isNaN(price) || price < 0) {
    return "Price must be a valid non-negative number";
  }
  if (quantity === undefined || isNaN(quantity) || quantity < 0) {
    return "Quantity must be a valid non-negative number";
  }
  if (minStock === undefined || isNaN(minStock) || minStock < 0) {
    return "Minimum stock must be a valid non-negative number";
  }
  return null;
};

// POST /products
export const createProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, minStock } = req.body;

    const validationError = validateProductFields({ name, category, price, quantity, minStock });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const product = await Product.create({ name, category, price, quantity, minStock });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error while creating product" });
  }
};

// GET /products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

// GET /products/low-stock
export const getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({
      $expr: { $lte: ["$quantity", "$minStock"] },
    }).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching low-stock products" });
  }
};

// PUT /products/:id
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const { name, category, price, quantity, minStock } = req.body;

    const validationError = validateProductFields({ name, category, price, quantity, minStock });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { name, category, price, quantity, minStock },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error while updating product" });
  }
};

// DELETE /products/:id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting product" });
  }
};
