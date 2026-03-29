const CartModel = require("../models/cartModel");
const catchAsync = require("../utils/catchAsync");

const getValidQuantity = (quantity) => {
  const parsed = Number(quantity);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 0;
  }
  return Math.floor(parsed);
};

const mergeItemsIntoCart = (cart, itemsMap = {}) => {
  Object.entries(itemsMap).forEach(([productId, quantity]) => {
    const validQuantity = getValidQuantity(quantity);
    if (!validQuantity) {
      return;
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += validQuantity;
    } else {
      cart.items.push({
        product: productId,
        quantity: validQuantity,
      });
    }
  });
};

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

exports.mergeCart = catchAsync(async (req, res, next) => {
  const { items = {} } = req.body;

  let cart = await CartModel.findOne({ user: req.user.id });
  if (!cart) {
    cart = await CartModel.create({
      user: req.user.id,
      items: [],
    });
  }

  mergeItemsIntoCart(cart, items);
  await cart.save();

  const populatedCart = await CartModel.findOne({ user: req.user.id })
    .populate("items.product")
    .lean();

  res.status(200).json({
    status: "success",
    data: {
      cart: populatedCart,
    },
  });
});

exports.getCart = catchAsync( async (req, res, next) => {
  const cart = await CartModel.findOne({ user: req.user.id })
    .populate("items.product")
    .lean();
  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});
