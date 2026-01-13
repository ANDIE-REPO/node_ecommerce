const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const { jwtAuthMiddleware } = require('../jwt');
const { adminOnly } = require('../middlewares/role');

/* ========= PUBLIC ROUTES ========= */

// Get all products (pagination later)
router.get('/', async (req, res) => {
  const products = await Product.find({ isDeleted: false });
  res.json(products);
});

// Get single product
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product || product.isDeleted) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

/* ========= ADMIN ROUTES ========= */

// Create product
router.post('/', jwtAuthMiddleware, adminOnly, async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// Update product
router.put('/:id', jwtAuthMiddleware, adminOnly, async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
});

// Soft delete product
router.delete('/:id', jwtAuthMiddleware, adminOnly, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ message: 'Product deleted' });
});

module.exports = router;
