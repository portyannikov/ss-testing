const User = require('../models/userModel');

//USER FUNC
const updateMe = async function (req, res, next) {
  try {
  } catch (err) {}
};

//ADMIN FUNC
const getAllUsers = async function (req, res, next) {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};

const createUser = async function (req, res, next) {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};

module.exports = { getAllUsers, createUser };
