const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/productController');

// GET all products
router
.route('/')
.get(getAllProducts );

module.exports = router;