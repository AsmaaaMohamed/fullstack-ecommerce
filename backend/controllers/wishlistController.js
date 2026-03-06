const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const WishlistModel = require("../models/wishlistModel");

exports.getWishlist = catchAsync(async (req, res, next) => {
    const wishlist = await WishlistModel.find({ user: req.user._id }).populate("product").lean();
    const items = wishlist.map((item) => item.product);
    const ids = wishlist.map((item) => item.product._id);
    res.status(200).json({
        status: "success",
        data: {
            wishlist,
            items,
            ids,
        },
    });
});
exports.toggleWishItem = catchAsync(async (req, res, next) => {
    const { productId } = req.body;
    const userId = req.user.id;
    const existing = await WishlistModel.findOne({
      user: userId,
      product: productId,
    });
    if (existing) {
      await WishlistModel.deleteOne({ _id: existing._id });
      return res.json({
        type: "remove",
        productId,
      });
    }
    await WishlistModel.create({
      user: userId,
      product: productId,
    });
    return res.json({
      type: "add",
      productId,
    });
});