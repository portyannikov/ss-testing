const {
  createCategory,
  getAllCategories,
} = require('../controllers/categoryController');

const router = require('express').Router();

router.get('/', getAllCategories);
router.post('/', createCategory);

module.exports = router;
