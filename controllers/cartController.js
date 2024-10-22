const Cart = require('../models/cartModel');

const addCartItem = async function (req, res, next) {
  try {
    const userId = '670a6f178d29b6b2f6a46e19';
    let cart = await Cart.findOne({ user: userId }).populate({
      path: 'cartItems.product',
      select: 'name price gender',
    });

    if (!cart) {
      // Якщо кошик не існує, створіть новий
      cart = await Cart.create({
        user: userId,
        cartItems: [{ product: req.body.product, quantity: req.body.quantity }],
      });
    } else {
      // Якщо кошик існує, знайдіть товар
      const item = cart.cartItems.find(
        (item) => item.product._id.toString() === req.body.product
      );

      if (item) {
        // Якщо товар вже в кошику, просто оновіть його кількість
        item.quantity += req.body.quantity;
      } else {
        // Якщо товару немає в кошику, додайте його
        cart.cartItems.push({
          product: req.body.product,
          quantity: req.body.quantity,
        });
      }
    }

    // Збережіть зміни в кошику
    await cart.save();

    res.status(200).json({
      status: 'success',
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
      stack: err.stack,
    });
  }
};

const getCartItems = async function (req, res, next) {
  try {
    const userId = '670a6f178d29b6b2f6a46e19';
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'cartItems.product',
      select: 'name price',
    });

    res.status(200).json({
      status: 'success',
      cart,
    });
  } catch (err) {}
};

module.exports = { addCartItem, getCartItems };
