const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const { protect } = require('../controllers/authController');

router.use(protect);

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
// router.post('/remove', cartController.removeFromCart);
// router.post('/update', cartController.updateCartItem);
// router.post('/clear', cartController.clearCart);

module.exports = router;