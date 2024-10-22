const { addCartItem, getCartItems } = require('../controllers/cartController');

const router = require('express').Router();

router.post('/addItem', addCartItem);
router.get('/getCart', getCartItems);

module.exports = router;
