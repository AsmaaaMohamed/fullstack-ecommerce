const Category = require('../models/categoryModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllCategories = catchAsync(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({
        success: true,
        result: categories.length,
        data: { categories }
    });
});