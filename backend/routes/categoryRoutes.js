const express = require('express');
const router = express.Router();
const { getAllCategories } = require('../controllers/categoryController');

// GET all products
router
.route('/')
.get(getAllCategories);

module.exports = router;