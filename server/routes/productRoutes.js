// routes/productRoutes.js
const router = require('express').Router();
const Product = require('../models/Product');
const authMiddleware = require('../utils/authMiddleware'); // We'll create this soon

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE product (protected route)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, category, price, imageUrl } = req.body;
    const product = new Product({ name, category, price, imageUrl });
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE product (protected route)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE product (protected route)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
