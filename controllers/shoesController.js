const Shoes = require('../models/shoesModel');
const AppError = require('../utils/appError');

const sendResponse = function (data, status, statusCode, res) {
  res.status(statusCode).json({
    status: status,
    data: {
      data,
    },
  });
};

const getAllShoes = async function (req, res, next) {
  try {
    const shoes = await Shoes.find();

    sendResponse(shoes, 'success', 200, res);
  } catch (err) {
    next(new AppError(err.message, err.code));
  }
};

const getShoes = async function (req, res, next) {
  try {
    const shoes = await Shoes.findById(req.params.shoesId);

    if (!shoes) {
      return next(new AppError('Shoes does not exists!', 404));
    }

    sendResponse(shoes, 'success', 200, res);
  } catch (err) {
    next(new AppError(err.message, err.code));
  }
};

const createShoes = async function (req, res, next) {
  try {
    const shoes = await Shoes.create(req.body);

    sendResponse(shoes, 'success', 201, res);
  } catch (err) {
    next(new AppError(err.message, err.code));
  }
};

const updateShoes = async function (req, res, next) {
  try {
    const updatedShoes = await Shoes.findByIdAndUpdate(
      req.params.shoesId,
      req.body,
      {
        runValidators: true,
        new: false,
      }
    );

    if (!updatedShoes) {
      return next(new AppError('No shoes found with that Id', 404));
    }

    sendResponse(updatedShoes, 'success', 200, res);
  } catch (err) {
    next(new AppError(err.message, err.code));
  }
};

const deleteShoes = async function (req, res, next) {
  try {
    const deletedShoes = await Shoes.findByIdAndDelete(req.params.shoesId);

    if (!deletedShoes) {
      return next(new AppError('No shoes found with that Id', 404));
    }

    sendResponse(deletedShoes, 'success', 204, res);
  } catch (err) {
    next(new AppError(err.message, err.code));
  }
};

module.exports = {
  getAllShoes,
  getShoes,
  createShoes,
  updateShoes,
  deleteShoes,
};
