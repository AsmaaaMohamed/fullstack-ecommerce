const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const normalizeItemsMap = (items = {}) => {
  if (!items || typeof items !== "object" || Array.isArray(items)) {
    return {};
  }

  return Object.entries(items).reduce((acc, [productId, quantity]) => {
    const parsedQuantity = Number(quantity);
    if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
      return acc;
    }

    acc[productId] = Math.floor(parsedQuantity);
    return acc;
  }, {});
};

exports.placeOrder = catchAsync(async (req, res, next) => {
  const itemsMap = normalizeItemsMap(req.body.items);
  const productIds = Object.keys(itemsMap);

  if (productIds.length === 0) {
    return next(new AppError("Order items are required", 400));
  }

  const products = await Product.find({ _id: { $in: productIds } })
    .select("_id price")
    .lean();

  if (products.length !== productIds.length) {
    return next(new AppError("One or more products are invalid", 400));
  }

  const productById = new Map(
    products.map((product) => [product._id.toString(), product])
  );

  const orderItems = productIds.map((productId) => {
    const product = productById.get(productId);
    const quantity = itemsMap[productId];
    return {
      product: product._id,
      quantity,
      price: product.price,
    };
  });

  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: req.user.id,
    items: orderItems,
    subtotal,
  });

  // Clear persisted DB cart after placing the order successfully.
  await Cart.findOneAndUpdate(
    { user: req.user.id },
    { $set: { items: [] } }
  );

  const populatedOrder = await Order.findById(order._id)
    .populate("items.product")
    .lean();

  res.status(201).json({
    status: "success",
    data: {
      order: populatedOrder,
    },
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id })
    .populate("items.product")
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});
