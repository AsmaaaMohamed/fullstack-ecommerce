const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Category.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;