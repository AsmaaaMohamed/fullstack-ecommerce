const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET all products
router
.route('/')
.get(categoryController.getAllCategories);

module.exports = router;