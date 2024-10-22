const router = require('express').Router();
const { protect, isAdmin } = require('../controllers/authController');
const {
  getAllShoes,
  getShoes,
  createShoes,
  updateShoes,
  deleteShoes,
} = require('../controllers/shoesController');

//ALL USERS OF THE ROUTE
router.get('/', getAllShoes);
router.get('/:shoesId', getShoes);

//ADMIN ROUTE
// router.use(protect);
// router.use(isAdmin);

router.post('/', createShoes);
router.patch('/:shoesId', updateShoes);
router.delete('/:shoesId', deleteShoes);

module.exports = router;
