const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const { promisify } = require('util');

const signup = async function (req, res, next) {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

const login = async function (req, res, next) {
  try {
    if (!req.body.email || !req.body.password) {
      return next(new AppError('Provide correct email and password', 400));
    }

    const user = await User.findOne({ email: req.body.email }).select(
      '+password'
    );
    console.log(user);

    if (
      !user ||
      !(await user.correctPassword(req.body.password, user.password))
    ) {
      return next(new AppError('Incorect password or email', 401));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

const protect = async function (req, res, next) {
  //1)getting token and check of it's there
  //2)varification token
  //3)check if user still exists
  //4)check if user changed password after the token was issued
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    //verify
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //check current user
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('Your not logged in! Try again!', 401));
    }

    //check user changed pass
    if (currentUser.changePassAfterJWT(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Log in again!', 401)
      );
    }

    req.user = currentUser;
    next();
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const isAdmin = function (req, res, next) {
  if (req.user.role === 'admin') return next();
  else return next(new AppError('Access denied! You not Admin!'));
};

module.exports = { signup, login, protect, isAdmin };
