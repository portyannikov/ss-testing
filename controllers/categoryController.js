const Category = require('../models/categoryModel');

const getAllCategories = async function (req, res, next) {
  try {
    const categories = await Category.find();

    res.status(200).json({
      statuc: 'success',
      data: {
        categories,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};

const createCategory = async function (req, res, next) {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      statis: 'success',
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
};
