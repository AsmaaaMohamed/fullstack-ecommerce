const express = require('express');
const router = express.Router();

const { getWishlist, toggleWishItem } = require('../controllers/wishlistController');
const { protect } = require('../controllers/authController');

router.use(protect);

router
.route('/')
.get(getWishlist);
router
.route('/toggle')
.post(toggleWishItem);

module.exports = router;
