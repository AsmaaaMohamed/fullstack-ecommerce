const Category = require('../models/categoryModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllCategories = catchAsync(async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});