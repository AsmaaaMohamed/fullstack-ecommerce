const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const { protect } = require('../controllers/authController');

router.use(protect);

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.post('/merge', cartController.mergeCart);
router.delete('/', cartController.clearCart);
router.patch('/:productId', cartController.updateCartItem);
router.delete('/:productId', cartController.removeFromCart);

module.exports = router;
