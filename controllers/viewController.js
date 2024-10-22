const Cart = require('../models/cartModel');
const Shoes = require('../models/shoesModel');
const AppError = require('../utils/appError');

const getOverview = async function (req, res, next) {
  try {
    const shoes = await Shoes.find();

    res.status(200).render('base', {
      title: 'Shoes Store',
      shoes,
    });
  } catch (err) {
    console.log(err);
  }
};

const getCart = async function (req, res, next) {
  try {
    const userId = '670a6f178d29b6b2f6a46e19';
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'cartItems.product',
    });

    console.log(cart);
    res.status(200).render('cart', {
      cart: cart,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: 'An error occurred while fetching the cart.',
    });
  }
};

const getShoes = async function (req, res, next) {
  try {
    const shoes = await Shoes.findOne({ slug: req.params.slug });

    if (!shoes) {
      return next(new AppError('Shoes does not exists', 404));
    }

    res.status(200).render('base', {
      title: `Shoes Store | ${shoes.name}`,
      shoes,
    });
  } catch (err) {
    console.log(err);
  }
};

const getOverviewAdminPanel = async function (req, res, next) {
  try {
    res.status(200).render('adminOverview', {
      title: 'Admin Panel',
    });
  } catch (err) {
    console.log(err.message);
    next(err, 500); // передать ошибку в глобальный обработчик ошибок
  }
};

module.exports = {
  getOverview,
  getCart,
  getShoes,
  getOverviewAdminPanel,
};
