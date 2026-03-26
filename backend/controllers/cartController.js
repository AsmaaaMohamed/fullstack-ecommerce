const CartModel = require("../models/cartModel");
const catchAsync = require("../utils/catchAsync");

exports.addToCart = catchAsync( async (req, res, next) => {
  const { productId } = req.body;

  let cart = await CartModel.findOne({ user: req.user.id });

  // create cart if not exist
  if (!cart) {
    cart = await CartModel.create({
      user: req.user.id,
      items: [{ product: productId, quantity: 1 }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // product already in cart → increase quantity
      cart.items[itemIndex].quantity += 1;
    } else {
      // add new product
      cart.items.push({
        product: productId,
        quantity: 1,
      });
    }

    await cart.save();
  }

  res.status(200).json(cart);
});
exports.getCart = catchAsync( async (req, res, next) => {
  const cart = await CartModel.findOne({ user: req.user.id })
    .populate("items.product")
    .lean();

  res.json(cart);
});