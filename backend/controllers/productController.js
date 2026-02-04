const product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req, res) => {
    const products = await product.find();
    res.status(200).json({
        status:"success",
        result: products.length,
        data:{ products}
    });
});

exports.getProduct = catchAsync(async (req, res) => {
    const product = await product.findById(req.params.id);
    res.status(200).json({
        status:"success",
        data: { product }
    });
});
